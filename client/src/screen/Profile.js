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
import { Ionicons, Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../redux/Api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearToken } from "../redux/slice/tokenSlice";
const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const { data, error } = useGetUserQuery(token);
  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    dispatch(clearToken());
    navigation.replace("login");
  };
  return (
    <View style={styles.main}>
      <CustomHeader title="My Profile" />
      {/* profile */}
      <TouchableOpacity style={styles.imagecard}>
        <Ionicons name="ios-camera-sharp" size={45} color="black" />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.text}>{data?.user.name}</Text>
        <Text style={styles.text}>{data?.user.email}</Text>
        <Text style={styles.text}>{data?.user.mobile}</Text>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.profilebox}>
          <Entypo name="edit" size={20} color="white" />
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profilebox}
          onPress={() => navigation.navigate("order")}
        >
          <AntDesign name="menufold" size={20} color="white" />
          <Text style={styles.text}>My Order</Text>
        </TouchableOpacity>
        {data?.user.roll == "admin" && (
          <TouchableOpacity style={styles.profilebox}>
            <MaterialIcons
              name="admin-panel-settings"
              size={20}
              color="white"
            />
            <Text style={styles.text}>Admin Panel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.profilebox} onPress={() => logout()}>
          <MaterialIcons name="logout" size={20} color="white" />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
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
  box: {
    width: "90%",
    borderWidth: 0.6,
    borderColor: "white",
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
    borderRadius: 5,
  },
  profilebox: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 8,
    alignItems: "center",
  },
});
