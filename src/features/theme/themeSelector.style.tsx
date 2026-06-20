import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 16,
      color: theme.colors.text,
    },
    textContent: {
      display: "flex",
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
    },
    pressable: {
      width: 44,
      height: 44,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      verticalAlign: "auto",
    },
    button: {
      borderWidth: 1.5,
      borderColor: theme.colors.text,
      backgroundColor: "transparent",
      height: 24,
      width: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      verticalAlign: "auto",
    },
    buttonClicked: {
      height: 14,
      width: 14,
      borderRadius: 12,
    },
  });
