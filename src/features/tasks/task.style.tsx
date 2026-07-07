import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    taskContainer: {
      height: "70%",
      width: "80%",
      backgroundColor: theme.colors.backgroundAlt,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: theme.colors.background == "#fff" ? theme.colors.secundary : theme.colors.primary,
      padding: 20,
    },
    textContent: {
      height: "85%",
    },
    buttonContent: {
      alignItems: "flex-end",
      height: 32,
    },
    buttonsContainer: {
      height: "10%",
      alignItems: "flex-end",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    normalButton: {
      gap: 15,
      flexDirection: "row",
    },
    button: {
      width: 44,
      height: 44,
      borderRadius: 10,
      backgroundColor:
        theme.colors.background == "#fff"
          ? theme.colors.secundary
          : theme.colors.primary,
    },
    checkButton: {
      width: 44,
      height: 44,
      borderRadius: 10,
      borderWidth: 2,
      borderColor:
        theme.colors.background == "#fff"
          ? theme.colors.secundary
          : theme.colors.primary,
    },
  });
