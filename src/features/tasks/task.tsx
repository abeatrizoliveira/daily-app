// Importações
import { View, Text, Pressable, TextInput } from "react-native";
import { EnrichedMarkdownText } from "react-native-enriched-markdown";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./task.style";
import { BlurView } from "expo-blur";
import { X, Pencil, Eye, Check, Save, Tag } from "lucide-react-native";
import GlobalStyle from "@themes/global-style";
import { useState } from "react";
import { createMarkdownStyle } from "@themes/markdown-style";

const Task = ({ id, onCloseTask }: any) => {
  // Definição de variáveis e estados.
  const { theme } = useTheme();
  const taskTitle = "oi"; // Apenas para testar, APAGAR DEPOIS
  const taskDesc = "tchau"; // Apenas para testar, APAGAR DEPOIS
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);
  const [title, setTitle] = useState(id === null ? "" : taskTitle);
  const [desc, setDesc] = useState(id === null ? "" : taskDesc);
  const [editing, isEditing] = useState(false);
  const [editIcon, setEditIcon] = useState(
    <Pencil color={theme.colors.background} />,
  );
  const markdown = `*Welcome to Markdown!* 
- [ ] estudar
- [x] jogar`; // Apenas para testar, APAGAR DEPOIS

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
          <TextInput
            style={[global.h2, { fontWeight: 400 }]}
            placeholder="Título da tarefa..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={theme.colors.textAlt}
          ></TextInput>
          {editing ? (
            <TextInput
              style={global.p}
              placeholder="Descrição da tarefa..."
              value={markdown}
              onChangeText={setDesc}
            ></TextInput>
          ) : (
            <EnrichedMarkdownText
              markdown={markdown}
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
              // onPress={}
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
