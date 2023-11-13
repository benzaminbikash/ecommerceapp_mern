import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const CategoryList = ({ item }) => {
  return (
    <View key={item._id} style={styles.main}>
      <TouchableOpacity>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
};

export default CategoryList;
const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    marginTop: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  main: {
    margin: 10,
  },
});
