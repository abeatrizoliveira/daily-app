import { View, Text, Pressable } from "react-native";
import { CreateStyle } from "./header.style";
import { useTheme } from "../../../context/themeContext";
import { usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {ChevronLeft, Settings} from "lucide-react-native"; 

const Header = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const style = CreateStyle(theme);
  const path = usePathname();
  const screens = {
    "/": "Home",
    "/tasks": "Tarefas",
    "/pomodoro": "Pomodoro",
  };
  const showBackButton = ["/tasks"].includes(path);
  const showConfigButton = ["/tasks", "/"].includes(path);
  return (
    <View style={[style.container, { paddingTop: insets.top }]}>
      <View style={style.content}>
        <View style={style.btnText}>
          {showBackButton && (
            <Pressable>
              <ChevronLeft color={theme.colors.text} />
            </Pressable>
          )}
          <Text style={style.text}>
            {screens[path as keyof typeof screens]}
          </Text>
        </View>
      </View>
      {showConfigButton && (
        <Pressable>
          <Settings color={theme.colors.text}/>
        </Pressable>
      )}
    </View>
  );
};

export default Header;
