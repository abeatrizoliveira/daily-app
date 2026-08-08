import { Image, Text, TextInput, View, Pressable, Alert } from "react-native";
import { useTheme } from "../../../context/themeContext";
import { CreateStyle } from "./login.style";
import GlobalStyle from "@themes/global-style";
import { useState } from "react";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { SignIn } from "./login.service";

export default function Login() {
  const { theme } = useTheme();
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);
  const [secret, isSecret] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleBack() {
    router.back();
  }

  function handleRouter() {
    router.back();
    router.navigate("/signup");
  }

  async function handleSignIn() {
    setLoading(true);
    try {
      await SignIn(email, password);
      router.navigate("/(tabs)/");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro ao realizar o login.", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.content}>
        <Pressable onPress={handleBack} style={style.buttonBack}>
          <ChevronLeft color={theme.colors.text} size={32} />
          <Text style={style.buttonBackText}>Voltar</Text>
        </Pressable>
        <Text style={global.h1}>
          Olá
          <Text style={{ color: theme.colors.primary }}> de novo</Text>!
        </Text>
        <Text>Seu app de produtividade do dia a dia.</Text>
        <Image
          style={{ marginTop: 30, marginBottom: 30 }}
          source={
            secret
              ? require("@assets/img/bee_closed.png")
              : require("@assets/img/bee_open.png")
          }
        />

        <View style={style.viewButtons}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={style.input}
            autoComplete="email"
            inputMode="email"
            textContentType="emailAddress"
            placeholder="Digite seu e-mail"
            placeholderTextColor={theme.colors.textAlt}
          />

          <TextInput
            style={style.input}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Digite sua senha"
            autoCapitalize="none"
            secureTextEntry={true}
            onFocus={() => isSecret(true)}
            onBlur={() => isSecret(false)}
            placeholderTextColor={theme.colors.textAlt}
          />
        </View>
        <Pressable
          onPress={handleSignIn}
          style={({ pressed }) => [
            { transform: [{ scale: pressed ? 0.98 : 1 }] },
            [style.button],
          ]}
        >
          <Text style={{ color: theme.colors.background, fontWeight: 600 }}>
            Acessar conta
          </Text>
        </Pressable>
        <Pressable onPress={handleRouter}>
          <Text style={[global.p, { marginTop: 10 }]}>
            Não tem conta?
            <Text style={{ color: theme.colors.primary }}> Cadastre-se.</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
