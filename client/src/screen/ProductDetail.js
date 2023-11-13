import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SIZE, TOAST } from "../constants/constants";
import CustomBack from "../components/CustomBack";
import CartButton from "../components/CartButton";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "../redux/slice/cartSlice";

const ProductDetail = () => {
  const state = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const route = useRoute();
  const { item } = route.params;
  const [qty, setQty] = useState(1);
  const handleIncrease = () => {
    setQty(qty + 1);
  };
  const handleDecrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      TOAST("You can't decrease less than 1.");
    }
  };
  const handleSubmit = (item) => {
    const data = { ...item, qty };
    dispatch(addToCart(data));
  };
  const handleRemoveCart = (item) => {
    dispatch(removeCart(item));
    setQty(1);
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.imagebox}>
        <View style={{ position: "absolute", top: 10, marginLeft: 10 }}>
          <CustomBack />
        </View>
        <ImageBackground
          resizeMode="contain"
          source={{ uri: item.image }}
          style={styles.image}
        ></ImageBackground>
      </View>
      {/* details */}
      <View style={styles.boxdetail}>
        <Text style={styles.head}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      {/* cart functionality */}
      {state.find((d) => d._id === item._id) ? (
        <View style={styles.boxdetail}>
          <CartButton
            title="Remove Cart"
            submit={() => handleRemoveCart(item)}
          />
        </View>
      ) : (
        <>
          <View style={styles.addcart}>
            <TouchableOpacity onPress={handleDecrease}>
              <Ionicons name="remove-circle-sharp" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.zero}>{qty}</Text>
            <TouchableOpacity onPress={handleIncrease}>
              <Ionicons name="add-circle-sharp" size={30} color="white" />
            </TouchableOpacity>
          </View>
          {/* add to cart */}
          <View style={styles.boxdetail}>
            <CartButton title="Add to Cart" submit={() => handleSubmit(item)} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imagebox: {
    width: SIZE.WIDTH,
    height: 350,
    backgroundColor: "white",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  head: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 5,
    marginBottom: 5,
  },
  boxdetail: { margin: 10 },
  description: {
    color: "white",
    fontSize: 15,
  },
  addcart: {
    flexDirection: "row",
    marginLeft: 10,
    gap: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  zero: { color: "white", fontSize: 20, fontWeight: "bold" },
});
