import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/constants";
const CustomInput = ({
  placeholder,
  icon,
  keyboardType,
  value,
  setValue,
  blur,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.input}>
      <MaterialCommunityIcons name={icon} size={24} color="black" />
      <TextInput
        placeholder={placeholder}
        style={styles.data}
        keyboardType={keyboardType}
        value={value}
        onChangeText={setValue}
        onBlur={blur}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;
const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.primary,
    height: 45,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
    elevation: 5,
    marginTop: 12,
  },
  data: {
    color: "black",
    fontSize: 14,
    textDecorationLine: "none",
  },
});
