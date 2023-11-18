import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import Line from "../components/Line";
import CartButton from "../components/CartButton";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slice/cartSlice";

const CheckOut = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { item, totalPrice } = route.params;
  const cashOnDelivery = () => {
    Alert.alert("Order Successfully!");
    navigation.replace("order");
    dispatch(clearCart());
  };
  const onlinePayment = () => {
    Alert.alert("We will add online payment soon.");
  };
  return (
    <View style={styles.main}>
      <CustomHeader title="Checkout" back={true} />
      <ScrollView style={styles.second}>
        {/* product price */}
        <View style={styles.detail}>
          <Text style={styles.question}>
            Do you want to order these products?
          </Text>
          {item.map((item) => {
            return (
              <View style={styles.info} key={item._id}>
                <View>
                  <Text style={styles.text}>{item.title}</Text>
                  <Text style={styles.text}>Rs {item.price}</Text>
                </View>
                <Text style={styles.text}>Quantity: {item.qty}</Text>
              </View>
            );
          })}
          <Line />
          <View style={styles.info}>
            <Text style={styles.text1}>Total Price</Text>
            <Text style={styles.text1}>Rs {totalPrice}</Text>
          </View>
        </View>
        {/* choose method */}
        <Text style={styles.choosemethod}>Choose Your Payment Method:</Text>
        <View style={[styles.choose]}>
          <CartButton title="Cash on Delivery" submit={cashOnDelivery} />
          <View style={styles.gap}></View>
          <CartButton title="Online Payment" submit={onlinePayment} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckOut;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: "grey",
  },
  second: {
    padding: 10,
  },
  detail: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    elevation: 1,
    borderRadius: 5,
    shadowColor: "black",
  },
  question: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  text1: {
    color: "white",
    fontWeight: "600",
  },
  choose: {
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: "black",
    paddingVertical: 30,
  },
  choosemethod: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 15,
    marginBottom: 10,
  },
  gap: {
    marginVertical: 10,
  },
});
