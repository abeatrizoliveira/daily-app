import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./themeSelector.style";
import { Sun, Moon, SunMoon } from "lucide-react-native";

export const ThemeSelector = () => {
  const { theme, themeMode, changeTheme } = useTheme();
  const style = CreateStyle(theme);
  return (
    <View style={style.container}>
      <View style={style.content}>
        <View style={style.textContent}>
          <Sun color={theme.colors.text} size={32} strokeWidth={1.5} fill={theme.colors.text}/>
          <Text style={style.text}>Claro</Text>
        </View>
        <Pressable
          onPress={() => {
            changeTheme("light");
          }}
          style={style.pressable}
        >
          <View style={style.button}>
            <View
              style={[
                style.buttonClicked,
                themeMode === "light"
                  ? { backgroundColor: theme.colors.secundary }
                  : { backgroundColor: "transparent" },
              ]}
            ></View>
          </View>
        </Pressable>
      </View>
      <View style={style.content}>
        <View style={style.textContent}>
          <Moon color={theme.colors.text} size={32} strokeWidth={0} fill={theme.colors.text}/>
          <Text style={style.text}>Escuro</Text>
        </View>
        <Pressable
          onPress={() => {
            changeTheme("dark");
          }}
          style={style.pressable}
        >
          <View style={style.button}>
            <View
              style={[
                style.buttonClicked,
                themeMode === "dark"
                  ? { backgroundColor: theme.colors.primary }
                  : { backgroundColor: "transparent" },
              ]}
            ></View>
          </View>
        </Pressable>
      </View>
      <View style={style.content}>
        <View style={style.textContent}>
          <SunMoon color={theme.colors.text} size={32} strokeWidth={1.5} fill={theme.colors.text} />
          <Text style={style.text}>Sistema</Text>
        </View>
        <Pressable
          onPress={() => {
            changeTheme("system");
          }}
          style={style.pressable}
        >
          <View style={style.button}>
            <View
              style={[
                style.buttonClicked,
                themeMode === "system"
                  ? { backgroundColor: theme.colors.background === "#fff" ? theme.colors.secundary : theme.colors.primary  }
                  : { backgroundColor: "transparent" },
              ]}
            ></View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
