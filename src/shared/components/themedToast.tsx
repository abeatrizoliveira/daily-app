// components/ThemedToast.tsx
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useTheme } from "../../context/themeContext";

export default function ThemedToast() {
  const { theme } = useTheme();

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: theme.colors.success,
          backgroundColor: theme.colors.backgroundAlt,
        }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: theme.colors.error,
          backgroundColor: theme.colors.backgroundAlt,
        }}
        text1Style={{
          color: theme.colors.text,
        }}
      />
    ),
  };

  return <Toast config={toastConfig} />;
}
