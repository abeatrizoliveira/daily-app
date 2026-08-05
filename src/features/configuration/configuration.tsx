import { View, Text, Pressable, Image } from "react-native";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./configuration.style";
import GlobalStyle from "@themes/global-style";
import { ChevronRight } from "lucide-react-native";
import { router } from "expo-router";

export default function Configuration() {
  const { theme } = useTheme();
  const global = GlobalStyle(theme);
  const style = CreateStyle(theme);

  const handleNavigation = (pathname: string) => {
    router.navigate(pathname);
  };

  return (
    <View style={style.container}>
      <View style={style.content}>
        <Text style={global.h2}>Configuração</Text>
        <Text style={global.p}>
          Aqui você pode visualizar e/ou alterar suas informações e o tema do
          aplicativo.
        </Text>
        <View style={style.viewButtons}>
          <Pressable
            onPress={() => handleNavigation("/account")}
            style={({ pressed }) => [
              style.button,
              {
                // Destaca o botão visualmente quando a ordenação por data está ativa
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <Text style={[global.p, { fontSize: 16 }]}>Minha conta</Text>
            <ChevronRight color={theme.colors.text} />
          </Pressable>

          <Pressable
            onPress={() => handleNavigation("/themes")}
            style={({ pressed }) => [
              style.button,
              {
                // Destaca o botão visualmente quando a ordenação por data está ativa
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <Text style={[global.p, { fontSize: 16 }]}>Tema do aplicativo</Text>
            <ChevronRight color={theme.colors.text} />
          </Pressable>
        </View>

        <Image
          style={style.tinyLogo}
          source={
            theme.colors.background === "#fff"
              ? require("@assets/img/daily_bee_lt.png")
              : require("@assets/img/daily_bee_dk.png")
          }
        />
      </View>
    </View>
  );
}
