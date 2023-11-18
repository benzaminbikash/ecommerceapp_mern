import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./screen/Splash";
import Register from "./screen/auth/Register";
import Login from "./screen/auth/Login";
import ForgetPassword from "./screen/auth/ForgetPassword";
import Home from "./screen/Home";
import Cart from "./screen/Cart";
import Profile from "./screen/Profile";
import Notification from "./screen/Notification";
import { Entypo } from "@expo/vector-icons";
import ProductDetail from "./screen/ProductDetail";
import CheckOut from "./screen/CheckOut";
import Address from "./screen/Address";
import Order from "./screen/Order";
import CategoryDetail from "./screen/CategoryDetail";

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();
const Main = () => {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "home") {
            iconName = "home";
            color = focused ? "white" : "grey";
          } else if (route.name === "notification") {
            iconName = "notification";
            color = focused ? "white" : "grey";
          } else if (route.name === "cart") {
            iconName = "shopping-cart";
            color = focused ? "white" : "grey";
          } else if (route.name === "profile") {
            iconName = "user";
            color = focused ? "white" : "grey";
          }
          return <Entypo name={iconName} size={25} color={color} />;
        },
        tabBarStyle: {
          height: 50,
          backgroundColor: "black",
        },
      })}
    >
      <Bottom.Screen name="home" component={Home} />
      <Bottom.Screen name="notification" component={Notification} />
      <Bottom.Screen name="cart" component={Cart} />
      <Bottom.Screen name="profile" component={Profile} />
    </Bottom.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "none",
          headerShown: false,
        }}
      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="forget" component={ForgetPassword} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="detail" component={ProductDetail} />
        <Stack.Screen name="check" component={CheckOut} />
        <Stack.Screen name="address" component={Address} />
        <Stack.Screen name="order" component={Order} />
        <Stack.Screen name="category" component={CategoryDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
