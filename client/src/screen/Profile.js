import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
const Profile = () => {
  return (
    <View style={styles.main}>
      <CustomHeader title="My Profile" />
      {/* profile */}
      <TouchableOpacity style={styles.imagecard}>
        <Ionicons name="ios-camera-sharp" size={45} color="black" />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.text}>Bikash Nepali</Text>
        <Text style={styles.text}>benzaminbikash@gmail.com</Text>
        <Text style={styles.text}>9840279401</Text>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: "white",
  },
  imagecard: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    alignItems: "center",
    marginTop: 10,
  },
});
