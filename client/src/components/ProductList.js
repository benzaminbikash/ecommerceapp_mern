import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SIZE } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";

const ProductList = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main} key={item._id}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text>Rs {item.price}</Text>
      <View style={styles.button}>
        <TouchableOpacity style={styles.box}>
          <Text style={styles.info}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("detail", { item: item })}
        >
          <Text style={styles.info}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductList;
const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    marginTop: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginTop: 3,
  },
  main: {
    margin: 10,
    backgroundColor: "white",
    height: 230,
    width: SIZE.WIDTH / 2 - 20,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "white",
    alignItems: "center",
  },
  title: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "red",
    alignItems: "center",
    width: 80,
    paddingVertical: 8,
    borderRadius: 5,
  },
  button: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  info: {
    color: "white",
    fontSize: 13,
    fontWeight: "800",
  },
});
