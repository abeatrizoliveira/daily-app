import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundAlt,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      padding: 25,
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    gradient: {
      flex: 1,
    },
    button: {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40,
    },
    footer: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 25,
    },
  });
