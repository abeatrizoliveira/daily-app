// Importações
import { View, Text, Pressable, TextInput, Platform } from "react-native";
import { EnrichedMarkdownText } from "react-native-enriched-markdown";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./task.style";
import { BlurView } from "expo-blur";
import { X, Pencil, Eye, Check, Save, Tag, Trash } from "lucide-react-native";
import GlobalStyle from "@themes/global-style";
import { useState, useEffect } from "react";
import { createMarkdownStyle } from "@themes/markdown-style";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { deleteTask, getTask, saveTask } from "./task.repository";
import Toast from "react-native-toast-message";

const Task = ({ id, onCloseTask, userId }: any) => {
  // Definição de variáveis e estados.
  const { theme } = useTheme();
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);
  const [title, setTitle] = useState(id === null ? "" : "taskTitle");
  const [desc, setDesc] = useState(id === null ? "" : "oi");
  const [date, setDate] = useState(new Date());
  const [editing, isEditing] = useState(id === null ? true : false);
  const [editIcon, setEditIcon] = useState(
    id === null ? (
      <Eye color={theme.colors.background} size={24} />
    ) : (
      <Pencil color={theme.colors.background} size={24} />
    ),
  );

  // Definição de funções
  const handleEdit = () => {
    // Função para habilitar edição.
    isEditing((prev) => !prev);
  };

  const handleSave = () => {
    async function save() {
      if (!title) {
        alert("Digite o título da tarefa.");
        return;
      }
      const { error } = await saveTask(title, desc, date, userId);
      if (error) console.log(error);
    }
    save();
  };

  useEffect(() => {
    if (!id) return;
    async function loadTask() {
      const { data, error } = await getTask(id);
      if (error) console.log(error);

      setTitle(data?.titulo);
      setDesc(data?.descricao);
    }
    loadTask();
  }, [id]);

  const handleDelete = () => {
    if (!id) return;
    async function removeTask() {
      const { error } = await deleteTask(id);
      if (error) console.log(error);
    }
    removeTask();
    Toast.show({
      type: "success",
      text1: "Deletado com sucesso.",
      text2: "Sua tarefa foi excluída.",
      visibilityTime: 3000,
      position: "bottom",
    });
    onCloseTask();
  };

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

            {editing ? (
              Platform.OS === "ios" ? (
                <DateTimePicker
                  value={date}
                  mode="date"
                  onValueChange={(event, selectedDate) => setDate(selectedDate)}
                />
              ) : (
                <Pressable
                  onPress={() =>
                    DateTimePickerAndroid.open({
                      value: date,
                      mode: "date",
                      onValueChange: (event, selectedDate) => {
                        if (selectedDate) {
                          setDate(selectedDate);
                        }
                      },
                    })
                  }
                >
                  <Text style={style.dateText}>
                    {date.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </Text>
                </Pressable>
              )
            ) : (
              <Text style={style.dateText}>
                {date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })}
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
