import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
      position: 'relative'
    },
    taskContainer: {
      height: "70%",
      width: '80%',
      backgroundColor: theme.colors.backgroundAlt,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: theme.colors.secundary
    },
  });
