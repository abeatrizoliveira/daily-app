import { lightTheme } from "@themes/light-theme";
import { darkTheme } from "@themes/dark-theme";
import { createContext, useState, useContext, ReactNode } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<any>(null);

type ThemeProviderProp = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProp) {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system")
  let theme;
  if(themeMode === "light"){
    theme = lightTheme;
  }else if(themeMode === "dark"){
    theme = darkTheme;
  }else{
    theme = colorScheme === "dark" ? darkTheme : lightTheme;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
