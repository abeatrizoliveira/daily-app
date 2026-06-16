import { StyleSheet } from "react-native";

export const CreateStyle = (theme: any) =>
  StyleSheet.create({
    container:{
      display: "flex",
      flexDirection: "column",
      gap: 20
    },
    button: {
      borderWidth: 2,
      borderColor: theme.colors.text,
      backgroundColor: "transparent",
      height: 24,
      width: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignContent:"center",
      alignItems: "center",
      verticalAlign: "auto"
    },
    buttonClicked: {
      height: 12,
      width: 12,
      borderRadius:6,
      backgroundColor: theme.colors.secundary
    }
  });
