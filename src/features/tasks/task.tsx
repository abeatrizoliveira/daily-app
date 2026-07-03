import { View, Text, Pressable, TextInput } from "react-native";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./task.style";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import GlobalStyle from "@themes/global-style";
import { useState } from "react";

const Task = ({ id, onCloseTask }: any) => {
  const { theme } = useTheme();
  const taskTitle = "oi";
  const taskDesc = "tchau";
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);
  const [title, setTitle] = useState(id === null ? "" : taskTitle);
  const [desc, setDesc] = useState(id === null ? "" : taskDesc);

  return (
    <BlurView
      intensity={50}
      experimentalBlurMethod={"dimezisBlurView"}
      blurReductionFactor={20}
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
            style={global.h2}
            placeholder="Título da tarefa..."
            value={title}
            onChangeText={setTitle}
          ></TextInput>
          <TextInput
            style={global.p}
            placeholder="Descrição da tarefa..."
            value={desc}
            onChangeText={setDesc}
          ></TextInput>
        </View>
      </View>
    </BlurView>
  );
};

export default Task;
