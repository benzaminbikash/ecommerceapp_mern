import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slice/tokenSlice";

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      checkUser();
    }, 1500);
  }, []);
  const checkUser = async () => {
    const user = await AsyncStorage.getItem("@token");
    dispatch(setToken(user));
    if (user != null) {
      navigation.replace("main");
    } else {
      navigation.replace("login");
    }
  };
  return (
    <View style={styles.main}>
      <Image source={require("../image/splash.png")} />
      <Text style={styles.title}>Version 2.1</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
});
