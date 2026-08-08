import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "transparent",
      alignItems: "center",
    },
    content: {
      flex: 1,
      padding: 25,
      width: "100%",
      backgroundColor: theme.colors.backgroundAlt,
      borderTopLeftRadius: 45,
      borderTopRightRadius: 45,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: "100%",
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40,
      backgroundColor: theme.colors.background,
      borderWidth: 2,
      borderColor: theme.colors.textAlt,
      paddingLeft: 10,
    },
    button: {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40,
      marginTop: 25,
      backgroundColor: theme.colors.primary,
    },
    viewButtons: {
      width: "100%",
      gap: 15,
    },
    buttonBack: {
      position: "absolute",
      alignItems: "center",
      flexDirection: "row",
      top: 25,
      left: 25,
      height: 44,
    },
    buttonBackText: {
      color: theme.colors.text,
      backgroundColor:
        theme.colors.background == "#fff"
          ? `rgba(164,121,210,0.5)`
          : theme.colors.primary,
      borderRadius: 5,
      padding: 2,
    },
  });
