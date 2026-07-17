// Importações
import {
  View,
  Text,
  Pressable,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import { EnrichedMarkdownText } from "react-native-enriched-markdown";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./task.style";
import { BlurView } from "expo-blur";
import {
  X,
  Pencil,
  Eye,
  Check,
  Save,
  Tag,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import GlobalStyle from "@themes/global-style";
import { useState, useEffect } from "react";
import { createMarkdownStyle } from "@themes/markdown-style";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { ptBR } from "@utils/localeCalendarConfig";
import { deleteTask, getTask, saveTask } from "./task.repository";
import Toast from "react-native-toast-message";

const Task = ({
  id,
  onCloseTask,
  userId,
  onTaskCreated,
  onTaskDeleted,
}: any) => {
  // Definição de variáveis e estados.
  const { theme } = useTheme();
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date | null>(
    id === null ? new Date() : null,
  );
  const [editing, isEditing] = useState(id === null ? true : false);
  const [calendar, setCalendar] = useState(false);
  const [day, setDay] = useState<DateData>();

  // Definição de funções
  const handleEdit = () => {
    // Função para habilitar edição.
    isEditing((prev) => !prev);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Digite o título da tarefa.");
      return;
    }

    const { data, error } = await saveTask(title, desc, date, userId);

    if (error) {
      console.log(error);
      return;
    }

    onTaskCreated(data);
    onCloseTask();

    Toast.show({
      type: "success",
      text1: "Criado com sucesso.",
      text2: "Sua tarefa foi criada.",
      visibilityTime: 3000,
      position: "bottom",
    });
  };

  useEffect(() => {
    if (!id) return;

    async function loadTask() {
      const { data, error } = await getTask(id);

      if (error) {
        console.log(error);
        return;
      }

      setTitle(data?.titulo ?? "");
      setDesc(data?.descricao ?? "");
      setDate(data?.data_tarefa ? new Date(data.data_tarefa) : null);
    }

    loadTask();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    const { error } = await deleteTask(id);

    if (error) {
      console.log(error);
      return;
    }

    onTaskDeleted(id);
    onCloseTask();

    Toast.show({
      type: "success",
      text1: "Deletado com sucesso.",
      text2: "Sua tarefa foi excluída.",
      visibilityTime: 3000,
      position: "bottom",
    });
  };

  const handleOpenCalendar = () => {
    setCalendar(true);
  };

  LocaleConfig.locales["pt-br"] = ptBR;
  LocaleConfig.defaultLocale = "pt-br";

  return (
    <BlurView
      intensity={50}
      blurMethod={"dimezisBlurView"}
      style={style.container}
    >
      <View style={style.taskContainer}>
        <View style={style.buttonContent}>
          <Pressable onPress={onCloseTask} style={global.pressable}>
            <X size={24} color={theme.colors.text}></X>
          </Pressable>
        </View>
        <View style={style.textContent}>
          <View style={style.topTextContent}>
            {/* Título da tarefa */}
            {editing ? (
              <TextInput
                style={[
                  global.h2,
                  { fontWeight: 400, flex: 2, margin: 0, padding: 0 },
                ]}
                placeholder="Título da tarefa..."
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={theme.colors.textAlt}
              ></TextInput>
            ) : (
              <Text
                style={[
                  global.h2,
                  {
                    fontWeight: 400,
                    flex: 2,
                    color:
                      title == "" ? theme.colors.textAlt : theme.colors.text,
                  },
                ]}
              >
                {title != "" ? title : "Título da tarefa..."}
              </Text>
            )}

            {/* Data da tarefa */}
            {editing ? (
              calendar ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  // onRequestClose={}
                >
                  <View style={style.modalView}>
                    <View style={style.cancelButtonCalendarView}>
                    <Pressable>
                      <X color={theme.colors.background} />
                    </Pressable>
                    </View>
                    <Calendar
                      style={style.calendar}
                      theme={{
                        textMonthFontSize: 18,
                        monthTextColor: theme.colors.background,
                        todayTextColor:
                          theme.colors.background == "#fff"
                            ? theme.colors.secundary
                            : theme.colors.primary,
                        selectedDayBackgroundColor:
                          theme.colors.background == "#fff"
                            ? theme.colors.secundary
                            : theme.colors.primary,
                        selectedDayTextColor: theme.colors.background,
                        arrowColor: theme.colors.background,
                        calendarBackground: theme.colors.background,
                        textDayStyle: { color: theme.colors.text },
                      }}
                      minDate={new Date().toDateString()}
                      hideExtraDays
                      renderArrow={(direction: "right" | "left") =>
                        direction === "left" ? (
                          <ChevronLeft color={theme.colors.background} />
                        ) : (
                          <ChevronRight color={theme.colors.background} />
                        )
                      }
                      onDayPress={setDay}
                      markedDates={
                        day && {
                          [day.dateString]: { selected: true },
                        }
                      }
                    />
                  </View>
                </Modal>
              ) : (
                <Pressable onPress={handleOpenCalendar}>
                  <Text style={style.dateText}>
                    {date
                      ? date.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                        })
                      : "Sem data"}
                  </Text>
                </Pressable>
              )
            ) : (
              <Text style={style.dateText}>
                {date
                  ? date.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })
                  : "Sem data"}
              </Text>
            )}
          </View>

          {editing ? (
            <TextInput
              style={global.p}
              placeholder="Descrição da tarefa..."
              value={desc}
              onChangeText={setDesc}
              multiline={true}
            ></TextInput>
          ) : (
            <EnrichedMarkdownText
              markdown={desc}
              flavor="github"
              markdownStyle={createMarkdownStyle(theme)}
            />
          )}
        </View>
        <View style={style.buttonsContainer}>
          <View style={style.normalButton}>
            <Pressable
              // onPress={}
              style={({ pressed }) => [
                global.pressable,
                style.button,
                {
                  backgroundColor: pressed
                    ? theme.colors.background == "#fff"
                      ? theme.colors.secundaryAlt
                      : theme.colors.primaryAlt
                    : theme.colors.background == "#fff"
                      ? theme.colors.secundary
                      : theme.colors.primary,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <Tag color={theme.colors.background} size={24} />
            </Pressable>

            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                global.pressable,
                style.button,
                {
                  backgroundColor: pressed
                    ? theme.colors.background == "#fff"
                      ? theme.colors.secundaryAlt
                      : theme.colors.primaryAlt
                    : theme.colors.background == "#fff"
                      ? theme.colors.secundary
                      : theme.colors.primary,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <Save color={theme.colors.background} size={24} />
            </Pressable>

            <Pressable
              onPress={handleEdit}
              style={({ pressed }) => [
                global.pressable,
                style.button,
                {
                  backgroundColor: pressed
                    ? theme.colors.background == "#fff"
                      ? theme.colors.secundaryAlt
                      : theme.colors.primaryAlt
                    : theme.colors.background == "#fff"
                      ? theme.colors.secundary
                      : theme.colors.primary,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              {editing ? (
                <Eye color={theme.colors.background} size={24} />
              ) : (
                <Pencil color={theme.colors.background} size={24} />
              )}
            </Pressable>

            <Pressable
              onPress={handleDelete}
              style={({ pressed }) => [
                global.pressable,
                style.button,
                {
                  backgroundColor: pressed
                    ? theme.colors.background == "#fff"
                      ? theme.colors.secundaryAlt
                      : theme.colors.primaryAlt
                    : theme.colors.background == "#fff"
                      ? theme.colors.secundary
                      : theme.colors.primary,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <Trash color={theme.colors.background} size={24} />
            </Pressable>
          </View>

          <Pressable
            // onPress={}
            style={[global.pressable, style.checkButton]}
          >
            <Check
              color={
                theme.colors.background == "#fff"
                  ? theme.colors.secundary
                  : theme.colors.primary
              }
            />
          </Pressable>
        </View>
      </View>
    </BlurView>
  );
};

export default Task;
