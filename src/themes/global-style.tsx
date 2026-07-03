import { StyleSheet } from "react-native";

const GlobalStyle = (theme: any) =>
  StyleSheet.create({
    pressable: {
      width: 44,
      height: 44,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      verticalAlign: "auto",
    },
    h1: {
      fontSize: 32,
      fontWeight: 600,
      color: theme.colors.text,
    },
    h2: {
      fontSize: 24,
      fontWeight: 500,
      color: theme.colors.text,
    },
    h3: {
      fontSize: 16,
      color: theme.colors.text,
    },
    p: {
      fontSize: 14,
      color: theme.colors.text,
    },
  });

export default GlobalStyle;
