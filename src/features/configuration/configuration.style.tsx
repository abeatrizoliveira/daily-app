import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      position: "relative",
      
    },
    content: {
      padding: 25,
      height: "100%"
    },
    button: {
        height: 55,
        width: "100%",
        borderRadius: 10,
        backgroundColor: theme.colors.backgroundAlt,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    viewButtons: {
        marginTop: 30,
        gap: 30
    },
    tinyLogo: {
      width: 98,
      height: 30,
      alignSelf: "center",
    position: "absolute",
      bottom: 25
    }
  });
