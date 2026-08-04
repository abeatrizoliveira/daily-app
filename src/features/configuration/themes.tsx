import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./themes.style";
import GlobalStyle from "@themes/global-style";
import { ChevronRight } from "lucide-react-native";
import { ThemeSelector } from "@features/theme/ThemeSelector";

export default function ThemesConfig() {
  const { theme } = useTheme();
  const global = GlobalStyle(theme);
  const style = CreateStyle(theme);

  return (
    <View style={style.container}>
      <View style={style.content}>
        <Text style={global.h2}>Tema do Aplicativo</Text>
        <Text style={global.p}>
          Aqui você pode alterar o tema do aplicativo para as suas preferências.
        </Text>
        <View style={style.viewThemes}>
          <ThemeSelector></ThemeSelector>
        </View>
      </View>
    </View>
  );
}
