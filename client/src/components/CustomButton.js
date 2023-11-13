import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/constants";

const CustomButton = ({ title, isValid, submit, loading }) => {
  return (
    <Pressable
      style={[
        styles.main,
        { backgroundColor: isValid ? COLORS.button : COLORS.secondary },
      ]}
      disabled={!isValid}
      onPress={() => submit()}
    >
      {loading ? (
        <ActivityIndicator size={26} color="white" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  main: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginTop: 10,
  },
  title: {
    color: "white",
    fontWeight: "800",
    fontSize: 18,
  },
});
