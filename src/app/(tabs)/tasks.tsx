import { StyleSheet, Modal, View } from "react-native";
import Task from "@features/tasks/task";
import Header from "@shared/components/header/header";

export default function tasks() {
  return (
    <View style={styles.container}>
      <Modal 
        animationType="slide"
        transparent={true}>
        <Task id={null} />
      </Modal>
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
    backgroundColor: "#ff2",
  },
});
