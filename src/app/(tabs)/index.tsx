import { StyleSheet, Text, View } from "react-native";
import Navbar from "../../shared/components/navigation-bar/navbar";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Olá, mundo!</Text>
      </View>
      {/* <Navbar></Navbar> */}
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
