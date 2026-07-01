import { View, Text } from "react-native";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./task.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Task = ({ id }: any) => {
  const { theme } = useTheme();
  const style = CreateStyle(theme);

  return (
    <View style={style.container}>
      <View style={style.taskContainer}>
        <Text>{id === null ? "Texto" : "Olá"}
        </Text>
        <Text>Descrição</Text>
      </View>
    </View>
  );
};

export default Task;
