import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useCallback } from "react";
import CustomHeader from "../components/CustomHeader";
import { useSelector } from "react-redux";
import CartList from "../components/CartList";
import Line from "../components/Line";
import CartButton from "../components/CartButton";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const navigation = useNavigation();
  const state = useSelector((state) => state.cart.carts);
  let totalPrice = 0;
  const calculatePrice = state.map((item) => {
    totalPrice += item.qty * item.price;
  });

  return (
    <View style={styles.main}>
      <CustomHeader title="My Cart" />
      {state.length === 0 ? (
        <View style={styles.nocart}>
          <Text style={styles.shopping}>Please shopping no cart here!</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.cart}>
            {state.map((item) => {
              return <CartList item={item} />;
            })}
          </View>
          <View style={styles.final}>
            <View style={styles.des}>
              <Text style={styles.info}>Total Price </Text>
              <Text style={styles.text}>Rs {totalPrice}</Text>
            </View>
            <View style={styles.des}>
              <Text style={styles.info}>Shipping Charge</Text>
              <Text style={styles.text}>Rs 1</Text>
            </View>
            <View style={styles.des}>
              <Text style={styles.info}>Donation</Text>
              <Text style={styles.text}>Rs 1</Text>
            </View>
            <Line />
            <View style={styles.des}>
              <Text style={[styles.info, { fontSize: 17 }]}>Final Price </Text>
              <Text style={styles.text}>Rs {totalPrice + 2}</Text>
            </View>
          </View>
          <View style={styles.button}>
            <CartButton
              title="Checkout"
              submit={() => {
                navigation.navigate("check", {
                  totalPrice: totalPrice + 2,
                  item: state,
                });
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: "white",
  },
  cart: {
    padding: 10,
  },
  final: {
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10,
  },
  des: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  nocart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shopping: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  button: {
    margin: 10,
  },
});
