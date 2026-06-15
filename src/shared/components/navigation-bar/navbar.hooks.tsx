import { router, usePathname } from "expo-router";
import { Animated } from "react-native";
import { useRef, useEffect, ReactNode } from "react";
import { useTheme } from "../../../context/themeContext";

export const useNavbar = () => {
    const { theme } = useTheme();
  const pathname = usePathname();

  const handleNavigation = (targetPath: string) => {
    if (pathname !== targetPath) {
      router.navigate(targetPath);
    }
  };
  const getColor = (route: string) =>
    pathname === route ? theme.colors.secundary : theme.colors.text;

  return {
    pathname,
    handleNavigation,
    getColor,
  };
};

type NavIconProps = {
  path: string;
  children: ReactNode;
};

export const NavIcon = ({ path, children }: NavIconProps) => {
  const pathname = usePathname();
  let active = false;
  pathname === path ? (active = true) : (active = false);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: active ? 1.2 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>
  );
};
