import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  background: {
    position: "absolute",
    bottom: 0,
    height: 130,
    width: "100%",
    justifyContent: "center",
    padding: 25,
  },
  container: {
    backgroundColor: "#FFFCF1",
    width: "100%",
    height: 60,
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 4,
        spreadDistance: 0,
        color: "rgba(0,0,0,0.25)",
        inset: false,
      },
    ],
  },
});

export default style;
