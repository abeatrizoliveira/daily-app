import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "../context/themeContext";
import Header from "@shared/components/header/header";
import ThemedToast from "@shared/themedToast";
import { Stack, useSegments } from "expo-router";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const segments = useSegments() as string[];
  const isWelcomeScreen =
    segments.length === 0 ||
    (segments.length === 1 && segments[0] === "login") ||
    (segments.length === 1 && segments[0] === "signup");

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        {!isWelcomeScreen && <Header />}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="login"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.85],
              sheetGrabberVisible: true,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />

          {/* Modal do Cadastro */}
          <Stack.Screen
            name="signup"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.9],
              sheetGrabberVisible: true,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </Stack>
        <ThemedToast />
      </View>
    </ThemeProvider>
  );
}
