import { lightTheme } from "@themes/light-theme";
import { darkTheme } from "@themes/dark-theme";
import { createContext, useState, useContext, ReactNode, useRef } from "react";
import { useColorScheme, Animated } from "react-native";

export const ThemeContext = createContext<any>(null);

type ThemeProviderProp = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProp) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    "system",
  );
  let theme;
  if (themeMode === "light") {
    theme = lightTheme;
  } else if (themeMode === "dark") {
    theme = darkTheme;
  } else {
    theme = colorScheme === "dark" ? darkTheme : lightTheme;
  }

  const changeTheme = (newTheme: "light" | "dark" | "system") => {
    const currentTheme = theme;

    setIsTransitioning(true);

    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2520,
      useNativeDriver: true,
    }).start(() => {
      setThemeMode(newTheme);

      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false);
      });
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
        changeTheme,
      }}
    >
      <>
        {children}

        {isTransitioning && (
          <Animated.View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.colors.background,
              opacity: fadeIn,
            }}
          />
        )}
      </>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
