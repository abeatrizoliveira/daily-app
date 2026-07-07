import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/themeContext";
import Header from "@shared/components/header/header";
import { supabase } from "@utils/supabase";

export default function App() {
  async function loginUsuario() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "eutanasia032.sia@gmail.com",
      password: "123456789",
    });

    if (error) {
      console.error("Erro ao fazer login:", error.message);
      return null;
    }

    console.log("Login bem-sucedido, usuário:", data.user.id);
    return data.user.id;
  }
  loginUsuario();

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

const CreateStyle = (theme: any) =>
  StyleSheet.create({
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
