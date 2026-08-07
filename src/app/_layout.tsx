import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "../context/themeContext";
import Header from "@shared/components/header/header";
import ThemedToast from "@shared/components/themedToast";
import { Stack, useSegments } from "expo-router";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const segments = useSegments() as string[];
  const isWelcomeScreen = segments.length === 0;

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        {!isWelcomeScreen && <Header />}
        <Stack screenOptions={{ headerShown: false }} />
        <ThemedToast />
      </View>
    </ThemeProvider>
  );
}
