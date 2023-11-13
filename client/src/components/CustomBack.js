import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.main}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="left" size={20} color="black" />
    </TouchableOpacity>
  );
};

export default CustomBack;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "red",
    elevation: 12,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
});
