import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      alignItems: "center",
      position: 'relative'
    },
    taskContainer: {
      height: "70%",
      width: '80%',
      backgroundColor: theme.colors.backgroundAlt,
    },
  });
