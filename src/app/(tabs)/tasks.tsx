import { StyleSheet, Modal, View, Pressable } from "react-native";
import Task from "@features/tasks/task";
import { useState } from "react";
import { Plus } from "lucide-react-native";

export default function tasks() {
  const [openTask, isOpenTask] = useState<boolean>(false);
  const [idTask, isIdTask] = useState<number | null>(null);
  function handleTask() {
    isOpenTask(true);
    isIdTask(null);
  }
  function closeTask() {
    isOpenTask(false);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleTask}>
        <Plus></Plus>
      </Pressable>
      {openTask && (
        <Modal animationType="slide" transparent={true} onRequestClose={closeTask}>
          <Task id={idTask} onCloseTask={closeTask} />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
