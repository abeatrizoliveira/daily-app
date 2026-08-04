import { intercom } from "@lucide/lab";
import { Bold } from "lucide-react-native";
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
      paddingTop: 0,
      width: "100%",
    },
    weatherContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      padding: 8,
      backgroundColor:
        theme.colors.background == "#fff"
          ? theme.colors.primary
          : theme.colors.backgroundAlt,
      outlineColor:
        theme.colors.background == "#fff"
          ? theme.colors.primary
          : theme.colors.backgroundAlt,
      borderRadius: 20,
      outlineWidth: 2,
      boxShadow: [
        {
          offsetX: 0,
          offsetY: 0,
          blurRadius: 4,
          spreadDistance: 0,
          color: "rgba(0,0,0,0.15)",
          inset: false,
        },
      ],
    },
    weatherInfo: {
      width: "100%",
      flexShrink: 1,
      display: "flex",
      gap: 3,
      flexDirection: "column",
    },
    dayText: {
      fontWeight: 600,
      fontSize: 16,
      color: "#fff",
      marginBottom: 3,
    },
    tempText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: 500,
    },
    descText: {
      color: "#fff",
      fontSize: 15,
    },
    introText: {
      color: theme.colors.text,
      fontSize: 32,
      fontWeight: 600,
      marginBottom: 15,
    },
    introTextUser: {
      color: theme.colors.primary,
    },
    h3: {
      fontSize: 18,
      fontWeight: 500,
      marginTop: 30,
      marginBottom: 30,
      color: theme.colors.text,
    },
    TaskContainer: {
      width: "100%",
      padding: 15,
      backgroundColor: theme.colors.backgroundAlt,
      marginTop: 15,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      gap: 10,
    },
    text: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    tagButton: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    titulo: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "500",
    },
    data: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: "500",
    },
    completeButton: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      borderRadius: 50,
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
    },
    viewInfoTextTask: {
      marginTop: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    infoTextTask: {
      fontSize: 16,
      color: theme.colors.text,
    },
  });
