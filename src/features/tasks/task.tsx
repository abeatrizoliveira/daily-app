import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./task.style";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";

const Task = ({ id, onCloseTask }: any) => {
  const { theme } = useTheme();
  const style = CreateStyle(theme);

  return (
    <BlurView
      intensity={50}
      experimentalBlurMethod={"dimezisBlurView"}
      blurReductionFactor={20}
      style={style.container}
    >
      <View style={style.taskContainer}>
        <Pressable onPress={onCloseTask}>
          <X></X>
        </Pressable>
        <Text>{id === null ? "Texto" : "Olá"}</Text>
        <Text>Descrição</Text>
      </View>
    </BlurView>
  );
};

export default Task;
