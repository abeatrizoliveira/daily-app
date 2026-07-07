import { Tabs } from "expo-router";
import NavBar from "@shared/components/navigation-bar/navbar";

export default function Layout() {
  return (
    
    <Tabs
      tabBar={() => <NavBar />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="tasks" />
      <Tabs.Screen name="pomodoro" />
    </Tabs>
  );
}
