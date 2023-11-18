import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SIZE } from "../constants/constants";
import { Entypo } from "@expo/vector-icons";
import Line from "./Line";
const CustomModal = ({ close }) => {
  return (
    <View style={styles.main}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>Filter Products</Text>
          <TouchableOpacity style={styles.cross} onPress={close}>
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Line />
      </View>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
  modal: {
    backgroundColor: "white",
    width: SIZE.WIDTH,
    height: SIZE.HEIGHT / 1.8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 5,
    marginTop: 4,
  },
});
