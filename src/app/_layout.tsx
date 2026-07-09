import { Stack } from "expo-router";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "../context/themeContext";
import Header from "@shared/components/header/header";
import ThemedToast from "@shared/components/themedToast";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <Header></Header>
        <Stack screenOptions={{ headerShown: false }} />
        <ThemedToast />
      </View>
    </ThemeProvider>
  );
}
