import { Animated, View, Pressable } from "react-native";
import { useRef, useEffect } from "react";
import style from "./navbar.style";
import { LinearGradient } from "expo-linear-gradient";
import { Pencil, Icon } from "lucide-react-native";
import { bee, fruit } from "@lucide/lab";
import { useNavbar, NavIcon } from "./navbar.hooks";
import { usePathname } from "expo-router";

const Navbar = () => {
  const { handleNavigation, getColor } = useNavbar();
  const pathname = usePathname();

  return (
    <LinearGradient
      colors={["rgba(164, 121, 210, 0.30)", "rgba(164, 121, 210, 0)"]}
      style={style.background}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
    >
      <View style={style.container}>
        <Pressable onPress={() => handleNavigation("/tasks")}>
          <NavIcon path={"/tasks"}>
            <Pencil color={getColor("/tasks")} size={32} />
          </NavIcon>
        </Pressable>
        <Pressable onPress={() => handleNavigation("/")}>
          <NavIcon path={"/"}>
            <Icon iconNode={bee} color={getColor("/")} size={32} />
          </NavIcon>
        </Pressable>
        <NavIcon path={"/pomodoro"}>
          <Icon iconNode={fruit} color={getColor("/pomodoro")} size={32} />
        </NavIcon>
      </View>
    </LinearGradient>
  );
};

export default Navbar;
