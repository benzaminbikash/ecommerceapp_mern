import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CartButton = ({ title, submit }) => {
  return (
    <Pressable style={styles.main} onPress={() => submit()}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default CartButton;
const styles = StyleSheet.create({
  main: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "red",
  },
  title: {
    color: "white",
    fontWeight: "800",
    fontSize: 18,
  },
});
