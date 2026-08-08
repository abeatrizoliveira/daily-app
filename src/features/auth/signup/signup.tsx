import Login from "@features/auth/login/login";
import { Image, Text, TextInput, View, Pressable } from "react-native";
import { useTheme } from "../../../context/themeContext";
import { CreateStyle } from "./signup.style";
import GlobalStyle from "@themes/global-style";
import { useState } from "react";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function SignUp() {
  const { theme } = useTheme();
  const style = CreateStyle(theme);
  const global = GlobalStyle(theme);
  const [secret, isSecret] = useState(false);

  function handleBack() {
    router.back();
  }

  function handleRouter() {
    router.back();
    router.navigate("/login");
  }

  return (
    <View style={style.container}>
      <View style={style.content}>
        <Pressable onPress={handleBack} style={style.buttonBack}>
          <ChevronLeft color={theme.colors.text} size={32} />
          <Text style={style.buttonBackText}>Voltar</Text>
        </Pressable>
        <Text style={global.h1}>
          Seja
          <Text style={{ color: theme.colors.primary }}> bem-vindo</Text>!
        </Text>
        <Text style={[global.p, { textAlign: "center" }]}>
          Seu app de produtividade do dia a dia.
          {"\n"}
          Organize suas tarefas e tenha uma visão ampla, enquanto mantém seu
          foco!
        </Text>
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
            style={style.input}
            autoComplete="username-new"
            inputMode="text"
            textContentType="name"
            placeholder="Digite seu nome de usuário"
            placeholderTextColor={theme.colors.textAlt}
          />

          <TextInput
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
            secureTextEntry={true}
            placeholder="Digite sua senha"
            onFocus={() => isSecret(true)}
            onBlur={() => isSecret(false)}
            placeholderTextColor={theme.colors.textAlt}
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            { transform: [{ scale: pressed ? 0.98 : 1 }] },
            [style.button],
          ]}
        >
          <Text style={{ color: theme.colors.background, fontWeight: 600 }}>
            Criar conta
          </Text>
        </Pressable>
        <Pressable onPress={handleRouter}>
          <Text style={[global.p, { marginTop: 10 }]}>
            Já tem conta?
            <Text style={{ color: theme.colors.primary }}> Faça login.</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
