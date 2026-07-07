import { StyleSheet, Modal, View, Pressable } from "react-native";
import Task from "@features/tasks/task";
import { useState } from "react";
import { Plus } from "lucide-react-native";
import { ThemeSelector } from "@features/theme/ThemeSelector";
import { useTheme } from "../../context/themeContext";

export default function tasks() {
  const [openTask, isOpenTask] = useState<boolean>(false);
  const [idTask, isIdTask] = useState<number | null>(null);
    const { theme } = useTheme();
  
    const style = CreateStyle(theme);
  
  function handleTask() {
    isOpenTask(true);
    isIdTask(null);
  }
  function closeTask() {
    isOpenTask(false);
  }

  return (
    <View style={style.container}>
      <Pressable onPress={handleTask}>
        <Plus></Plus>
      </Pressable>
      <ThemeSelector />
      {openTask && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={closeTask}
        >
          <Task id={idTask} onCloseTask={closeTask} />
        </Modal>
      )}
    </View>
  );
}

const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        theme.colors.background == "#fff"
          ? theme.colors.background
          : theme.colors.background,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      padding: 25,
    },
    taskContainer: {
      width: "80%",
      height: 20,
    },
  });
