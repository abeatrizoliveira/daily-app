import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 30,
      width: "100%",
    },
    content: {
      alignItems: "center",
    },
    btnText: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      padding: 5,
      borderRadius: 5,
      backgroundColor:
        theme.colors.background == "#fff"
          ? `rgba(164,121,210,0.5)`
          : theme.colors.primary,
    },
  });
