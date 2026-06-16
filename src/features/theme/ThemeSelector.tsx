import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../context/themeContext";
import { CreateStyle } from "./themeSelector.style";
import { useState } from "react";

export const ThemeSelector = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const style = CreateStyle(theme);
  return (
    <View style={style.container}>
      <View style={style.button}>
        <Pressable
          onPress={() => {
            setThemeMode("light");
          }}
          style={themeMode == "light" ? style.buttonClicked : style.button}
        ></Pressable>
      </View>
      <View style={style.button}>
        <Pressable onPress={() => {
            setThemeMode("dark");
          }}
          style={themeMode == "dark" ? style.buttonClicked : style.button}>
        </Pressable>
      </View>
      <View style={style.button}>
        <Pressable onPress={() => {
            setThemeMode("system");
          }}
          style={themeMode  == "system" ? style.buttonClicked : style.button}>
        </Pressable>
      </View>
    </View>
  );
};
