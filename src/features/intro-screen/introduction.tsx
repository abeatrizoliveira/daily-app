import { Image, Text, View, Pressable } from "react-native";
import { Copyright } from "lucide-react-native";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./introduction.style";
import { Svg, RadialGradient, Defs, Rect, Stop } from "react-native-svg";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Intro() {
  const { theme } = useTheme();
  const style = CreateStyle(theme);

  function handleLogin() {
    router.navigate("/login");
  }

  function handleCadastro() {
    router.navigate("/signup");
  }

  return (
    <View style={style.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="top" cx="50%" cy="50%" r="100%">
            <Stop
              offset="0%"
              stopColor={
                theme.colors.background === "#fff" ? "#A479D2" : "#d4bf67"
              }
              stopOpacity="0.35"
            />
            <Stop offset="100%" stopColor="#A479D2" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#top)" />
      </Svg>
      <View style={style.content}>
        <Text
          style={{ fontSize: 40, fontWeight: 700, color: theme.colors.text }}
        >
          Olá, <Text style={{ color: theme.colors.primary }}>bem-vindo</Text>!
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            color: theme.colors.text,
          }}
        >
          Seu app de produtividade do dia a dia.
          {"\n"}
          Organize suas tarefas e tenha uma visão ampla, enquanto mantém seu
          foco!
        </Text>
        <Image
          style={{
            marginTop: 25,
            marginBottom: 25,
          }}
          source={require("@assets/animation/bee.gif")}
        />
        <View
          style={{
            width: "100%",
            gap: 15,
          }}
        >
          <Pressable
            onPress={handleCadastro}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
              [style.button, { backgroundColor: theme.colors.primary }],
            ]}
          >
            <Text style={{ color: theme.colors.background, fontWeight: 600 }}>
              Criar conta
            </Text>
          </Pressable>
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
              [
                style.button,
                { borderWidth: 3, borderColor: theme.colors.primary },
              ],
            ]}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: 600 }}>
              Acessar conta
            </Text>
          </Pressable>
        </View>
        <View style={style.footer}>
          <Image
            source={
              theme.colors.background === "#fff"
                ? require("@assets/img/daily_bee_lt.png")
                : require("@assets/img/daily_bee_dk.png")
            }
          />
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Copyright size={12} color={theme.colors.textAlt} />
            <Text
              style={{
                color: theme.colors.textAlt,
                fontSize: 14,
              }}
            >
              {new Date().getFullYear()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
