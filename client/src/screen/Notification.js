import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Notification = () => {
  return (
    <View style={styles.main}>
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
});
