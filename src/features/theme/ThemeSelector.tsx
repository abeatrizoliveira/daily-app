import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../context/themeContext";

export const ThemeSelector = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  return (
    <View>
      <Pressable onPress={() => setThemeMode("light")}>
        <Text>Claro</Text>
      </Pressable>
      <Pressable onPress={() => setThemeMode("dark")}>
        <Text>Escuro</Text>
      </Pressable>
      <Pressable onPress={() => setThemeMode("system")}>
        <Text>Sistema</Text>
      </Pressable>
    </View>
  );
};
