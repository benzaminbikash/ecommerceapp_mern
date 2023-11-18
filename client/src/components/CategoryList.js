import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryList = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View key={item._id} style={styles.main}>
      <TouchableOpacity
        onPress={() => navigation.navigate("category", { item: item })}
      >
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
