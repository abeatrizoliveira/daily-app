// Importações
import { View, Text, Pressable, TextInput, Platform } from "react-native";
import { EnrichedMarkdownText } from "react-native-enriched-markdown";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./task.style";
import { BlurView } from "expo-blur";
import { X, Pencil, Eye, Check, Save, Tag } from "lucide-react-native";
import GlobalStyle from "@themes/global-style";
import { useState, useEffect } from "react";
import { createMarkdownStyle } from "@themes/markdown-style";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "@utils/supabase";

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
      <Eye color={theme.colors.background} />
    ) : (
      <Pencil color={theme.colors.background} />
    ),
  );

  // Definição de funções
  const handleEdit = () => {
    // Função para habilitar edição.
    if (editing) {
      isEditing(false);
      setEditIcon(<Pencil color={theme.colors.background} />);
    } else {
      isEditing(true);
      setEditIcon(<Eye color={theme.colors.background} />);
    }
  };

  const handleSave = async () => {
    if(title != ""){
    async function saveTask() {
      const { error } = await supabase
        .from("tarefa")
        .insert({ titulo: title, descricao: desc, data_tarefa: date, id_usuario: userId });
      if (error) {
        console.log(error);
      }
    }
    saveTask();
  }else{
    alert("O título da tarefa é obrigatório!");
  }
  };

  useEffect(() => {
    if (id != null) {
      async function getTask() {
        const { data, error } = await supabase
          .from("tarefa")
          .select("titulo,descricao")
          .eq("id_tarefa", id);
        if (error) {
          console.log(error);
        } else {
          setTitle(data[0].titulo);
          setDesc(data[0].descricao);
        }
      }
      getTask();
    }
  }, [id]);

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
                style={[global.h2, { fontWeight: 400, flex: 2, margin: 0, padding: 0}]}
                placeholder="Título da tarefa..."
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={theme.colors.textAlt}
              ></TextInput>
            ) : (
              <Text style={[global.h2, { fontWeight: 400, flex: 2, color: title == "" ? theme.colors.textAlt : theme.colors.text} ]}>
                {title != "" ? title : "Título da tarefa..." }
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
                 <Text style={style.dateText}>{date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit'
              })}</Text>
                </Pressable>
              )
            ) : (
              <Text style={style.dateText}>{date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit'
              })}</Text>
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
              style={[global.pressable, style.button]}
            >
              <Tag color={theme.colors.background} />
            </Pressable>

            <Pressable
              onPress={handleSave}
              style={[global.pressable, style.button]}
            >
              <Save color={theme.colors.background} />
            </Pressable>

            <Pressable
              onPress={handleEdit}
              style={[global.pressable, style.button]}
            >
              {editIcon}
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
