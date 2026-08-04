import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, Pressable, TextInput, Modal } from "react-native";
import { EnrichedMarkdownText } from "react-native-enriched-markdown";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./task.style";
import { BlurView } from "expo-blur";
import {
  X,
  Pencil,
  Eye,
  Check,
  Tag,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import GlobalStyle from "@themes/global-style";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { ptBR } from "@utils/localeCalendarConfig";
import { deleteTask, getTask, updateTask, saveTask } from "./task.repository";
import Toast from "react-native-toast-message";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface TaskProps {
  id: number | null;
  userId: string | null;
  onCloseTask: () => void;
  onTaskCreated: (task: any) => void;
  onTaskUpdated: (task: any) => void;
  onTaskDeleted: (id: number) => void;
}

const Task = ({
  id,
  userId,
  onCloseTask,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
}: TaskProps) => {
  const { theme } = useTheme();
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);

  const [currentId, setCurrentId] = useState<number | null>(id);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [editing, setEditing] = useState(true);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DateData | undefined>();

  // Guarda estado para evitar chamadas desnecessárias no banco
  const stateRef = useRef({ title, desc, date, currentId, userId });
  useEffect(() => {
    stateRef.current = { title, desc, date, currentId, userId };
  }, [title, desc, date, currentId, userId]);

  // Carregar dados se a task já existir
  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    async function fetchTask() {
      const { data, error } = await getTask(id!);
      if (error || !data || !isMounted) return;

      setTitle(data.titulo || "");
      setDesc(data.descricao || "");

      if (data.data_tarefa) {
        const parsedDate = new Date(data.data_tarefa);
        setDate(parsedDate);
        setSelectedDay({
          dateString: parsedDate.toISOString().split("T")[0],
          day: parsedDate.getDate(),
          month: parsedDate.getMonth() + 1,
          year: parsedDate.getFullYear(),
          timestamp: parsedDate.getTime(),
        });
      }
      setEditing(false);
    }

    fetchTask();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Função central de persistência (Autosave / Debounce)
  const persistChanges = useCallback(async () => {
    const { title: t, desc: d, date: dt, currentId: cId, userId: uId } = stateRef.current;

    // Se estiver vazio e não foi salvo ainda, não cria nada
    if (!t.trim() && !d.trim()) return;

    if (cId) {
      // Atualizar existente
      const { data, error } = await updateTask(cId, {
        titulo: t,
        descricao: d,
        data_tarefa: dt,
      });

      if (!error && data) {
        onTaskUpdated(data);
      }
    } else if (uId) {
      // Criar nova
      const { data, error } = await saveTask(
        { titulo: t || "Nova Tarefa", descricao: d, data_tarefa: dt },
        uId
      );

      if (!error && data) {
        setCurrentId(data.id_tarefa);
        onTaskCreated(data);
      }
    }
  }, [onTaskCreated, onTaskUpdated]);

  // Debounce para salvamento automático enquanto digita
  useEffect(() => {
    const timer = setTimeout(() => {
      persistChanges();
    }, 800);

    return () => clearTimeout(timer);
  }, [title, desc, date, persistChanges]);

  const handleDelete = async () => {
    if (!currentId) {
      onCloseTask();
      return;
    }

    const { error } = await deleteTask(currentId);
    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao excluir a tarefa",
        position: "bottom",
      });
      return;
    }

    onTaskDeleted(currentId);
    onCloseTask();
    Toast.show({
      type: "success",
      text1: "Tarefa concluída/removida!",
      position: "bottom",
    });
  };

  const handleClearDate = () => {
    setSelectedDay(undefined);
    setDate(null);
    setCalendarOpen(false);
  };
  return (
    <BlurView intensity={50} blurMethod="dimezisBlurView" style={style.container}>
      <View style={style.taskContainer}>
        {/* Botão Fechar Modal */}
        <View style={style.buttonContent}>
          <Pressable onPress={onCloseTask} style={global.pressable}>
            <X size={24} color={theme.colors.text} />
          </Pressable>
        </View>

        <View style={style.textContent}>
          <View style={style.topTextContent}>
            {/* Título */}
            {editing ? (
              <TextInput
                style={[global.h2, { fontWeight: "400", flex: 2, margin: 0, padding: 0 }]}
                placeholder="Título da tarefa..."
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={theme.colors.textAlt}
              />
            ) : (
              <Text
                style={[
                  global.h2,
                  {
                    fontWeight: "400",
                    flex: 2,
                    color: title === "" ? theme.colors.textAlt : theme.colors.text,
                  },
                ]}
              >
                {title !== "" ? title : "Sem título"}
              </Text>
            )}

            {/* Data */}
            <Pressable onPress={() => setCalendarOpen(true)}>
              <Text style={style.dateText}>
                {date
                  ? date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
                  : "Sem data"}
              </Text>
            </Pressable>
          </View>

          {/* Calendário Modal */}
          {editing && 
          <Modal visible={calendarOpen} animationType="slide" transparent>
            <View style={style.modalView}>
              <View style={style.buttonsCalendarView}>
                <Pressable onPress={handleClearDate} style={[global.pressable, { width: "auto" }]}>
                  <Text style={[global.p, { color: theme.colors.background, fontWeight: "500" }]}>
                    Sem data
                  </Text>
                </Pressable>
                <Pressable onPress={() => setCalendarOpen(false)} style={global.pressable}>
                  <X color={theme.colors.background} />
                </Pressable>
              </View>
          

              <Calendar
                style={style.calendar}
                theme={{
                  textMonthFontSize: 18,
                  monthTextColor: theme.colors.background,
                  todayTextColor: theme.colors.primary,
                  selectedDayBackgroundColor: theme.colors.primary,
                  selectedDayTextColor: theme.colors.background,
                  arrowColor: theme.colors.background,
                  calendarBackground: theme.colors.background,
                  textDayStyle: { color: theme.colors.text },
                }}
                minDate={new Date().toISOString().split("T")[0]}
                hideExtraDays
                renderArrow={(dir) =>
                  dir === "left" ? (
                    <ChevronLeft color={theme.colors.background} />
                  ) : (
                    <ChevronRight color={theme.colors.background} />
                  )
                }
                onDayPress={(day) => {
                  setSelectedDay(day);
                  setDate(new Date(day.timestamp));
                  setCalendarOpen(false);
                }}
                markedDates={
                  selectedDay
                    ? { [selectedDay.dateString]: { selected: true } }
                    : {}
                }
              />
            </View>
          </Modal>
          }

          {/* Descrição */}
          {editing ? (
            <TextInput
              style={global.p}
              placeholder="Descrição da tarefa..."
              placeholderTextColor={theme.colors.textAlt}
              value={desc}
              onChangeText={setDesc}
              multiline
            />
          ) : (
            <EnrichedMarkdownText
              markdown={desc || "Sem descrição"}
              flavor="github"
              markdownStyle={{
                paragraph : {
                  color: desc == null ? theme.colors.textAlt : theme.colors.text,
                  fontSize: 14,
                }
              }}
            />
          )}
        </View>

        {/* Botões de Ação */}
        <View style={style.buttonsContainer}>
          <View style={style.normalButton}>
            <Pressable
              onPress={() => setEditing((prev) => !prev)}
              style={({ pressed }) => [
                global.pressable,
                style.button,
                { transform: [{ scale: pressed ? 0.95 : 1 }] },
              ]}
            >
              {editing ? (
                <Eye color={theme.colors.background} size={24} />
              ) : (
                <Pencil color={theme.colors.background} size={24} />
              )}
            </Pressable>

            {currentId && (
              <Pressable
                onPress={handleDelete}
                style={({ pressed }) => [
                  global.pressable,
                  style.button,
                  { transform: [{ scale: pressed ? 0.95 : 1 }] },
                ]}
              >
                <Trash color={theme.colors.background} size={24} />
              </Pressable>
            )}
          </View>

          {/* Botão de Marcar como Concluído (Exclui a Task) */}
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [
              global.pressable,
              style.checkButton,
              { transform: [{ scale: pressed ? 0.9 : 1 }] },
            ]}
          >
            <Check color={theme.colors.primary} size={20} />
          </Pressable>
        </View>
      </View>
    </BlurView>
  );
};

export default Task;