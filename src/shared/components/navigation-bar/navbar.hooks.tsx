import { router, usePathname } from "expo-router";
import { Animated } from "react-native";
import { useRef, useEffect, ReactNode } from "react";

export const useNavbar = () => {
  const pathname = usePathname();

  const handleNavigation = (targetPath: string) => {
    if (pathname !== targetPath) {
      router.navigate(targetPath);
    }
  };
  const getColor = (route: string) =>
    pathname === route ? "#A479D2" : "#2b2b2b";

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
