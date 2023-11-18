import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";

const Order = () => {
  return (
    <View style={styles.main}>
      <CustomHeader title="My Orders" back={true} />
      <Text>Order</Text>
    </View>
  );
};

export default Order;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: "white",
  },
});
