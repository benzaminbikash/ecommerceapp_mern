import { useNavigation } from "@react-navigation/native";
import { Dimensions, ToastAndroid } from "react-native";

export const COLORS = {
  primary: "#F4F2F8",
  secondary: "#DF6464",
  button: "#FA0C0C",
};

export const SIZE = {
  WIDTH: Dimensions.get("window").width,
  HEIGHT: Dimensions.get("window").height,
};

export const TOAST = (message) => ToastAndroid.show(message, ToastAndroid.LONG);

export const images = [
  require("../image/banner/1.jpg"),
  require("../image/banner/2.jpg"),
  require("../image/banner/3.jpg"),
  require("../image/banner/4.jpg"),
];
