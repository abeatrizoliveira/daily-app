import { View, Pressable } from "react-native";
import style from "./navbar.style";
import { LinearGradient } from "expo-linear-gradient";
import { Pencil, Icon } from "lucide-react-native";
import { bee, fruit } from "@lucide/lab";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Navbar = () => {
  const pathname = usePathname();
  const handleNavigation = (targetPath: string) => {
    if (pathname !== targetPath) {
      router.navigate(targetPath);
    } 
  };
  const getColor = (route: string) => 
    pathname === route ? "#A479D2" : "#2b2b2b";
  ;
   const getSize = (route: string) => 
    pathname === route ? 40 : 32;
  ;

  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={["rgba(164, 121, 210, 0.30)", "rgba(164, 121, 210, 0)"]}
      style={style.background}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
    >
      <View style={style.container}>
        <Pressable onPress={() => handleNavigation("/tasks")}>
          <Pencil color={getColor("/tasks")} size={getSize("/tasks")}  />
        </Pressable>
        <Pressable onPress={() => handleNavigation("/")}>
          <Icon iconNode={bee} color={getColor("/")} size={getSize("/")} />
        </Pressable>
        <Icon iconNode={fruit} color={getColor("/pomodoro")} size={getSize("/pomodoro")}  />
      </View>
    </LinearGradient>
  );
};

export default Navbar;
