import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
const SearchBox = () => {
  return (
    <View style={styles.main}>
      <View style={styles.box}>
        <TextInput
          placeholder="search product"
          placeholderTextColor="white"
          style={styles.text}
        />
        <TouchableOpacity>
          <Feather name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBox;
const styles = StyleSheet.create({
  main: {
    height: 70,

    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    color: "white",
  },
  box: {
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
