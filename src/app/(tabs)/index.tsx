import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/themeContext";
import Header from "@shared/components/header/header";


export default function App() {
  const { theme } = useTheme();
    const styles = CreateStyle(theme);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Olá, mundo!</Text>
      </View>
    </View>
  );
}

const CreateStyle = (theme:any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 25,
  },
});
