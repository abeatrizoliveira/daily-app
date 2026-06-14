import { StyleSheet, Text, View } from "react-native";

export default function pomodoro() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Você está na tela de pomodoro!</Text>
      </View>
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
});
