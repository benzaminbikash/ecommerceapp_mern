import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeCart } from "../redux/slice/cartSlice";
import { TOAST } from "../constants/constants";
const CartList = ({ item }) => {
  const dispatch = useDispatch();
  const incCart = (d) => {
    dispatch(increaseQty(d));
  };
  const decCart = (d) => {
    if (item.qty > 1) {
      dispatch(decreaseQty(d));
    } else {
      TOAST("Do you want to delete it?");
    }
  };
  const remCart = (d) => {
    dispatch(removeCart(d));
  };
  return (
    <View style={styles.cart}>
      <View style={styles.second}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>Rs {item.price}</Text>
        </View>
      </View>
      <View style={styles.icon}>
        <View style={styles.addcart}>
          <TouchableOpacity onPress={() => decCart(item)}>
            <Ionicons name="remove-circle-sharp" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.zero}>{item.qty}</Text>
          <TouchableOpacity onPress={() => incCart(item)}>
            <Ionicons name="add-circle-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.delete} onPress={() => remCart(item)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartList;
const styles = StyleSheet.create({
  cart: {
    width: "100%",
    borderWidth: 0.7,
    height: 65,
    borderColor: "grey",
    borderRadius: 6,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
  image: {
    width: 60,
    height: "100%",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    objectFit: "contain",
  },
  title: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
  },
  second: {
    flexDirection: "row",
    gap: 10,
    height: 65,
  },
  zero: { color: "white", fontSize: 20, fontWeight: "bold" },
  addcart: {
    flexDirection: "row",
    gap: 5,
  },
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  delete: {
    alignSelf: "center",
  },
});
