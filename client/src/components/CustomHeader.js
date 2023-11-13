import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomBack from "./CustomBack";

const CustomHeader = ({ title, back }) => {
  return (
    <View style={styles.main}>
      <View style={{ marginLeft: 10 }}>{back && <CustomBack />}</View>
      <Text style={styles.text}>{title}</Text>
      <View></View>
    </View>
  );
};

export default CustomHeader;
const styles = StyleSheet.create({
  main: {
    height: 50,
    borderBottomWidth: 0.6,
    borderBottomColor: "grey",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 17,
    fontWeight: "800",
  },
});
