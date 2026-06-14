import { Stack } from "expo-router";
import { View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {

  return (
    <View style={{ flex: 1, backgroundColor: "#fff"}}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}