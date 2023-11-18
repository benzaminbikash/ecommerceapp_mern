import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { loginScheme } from "../../utils/SignupSchme";
import { useNavigation } from "@react-navigation/native";
import { useLoginMutation } from "../../redux/Api/userApi";
import { TOAST } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slice/tokenSlice";
const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loginApi] = useLoginMutation();
  const dispatch = useDispatch();
  const handleLogin = async (v, a) => {
    setLoading(true);
    const response = await loginApi({
      email: v.email,
      password: v.password,
    });
    setLoading(false);
    if (
      response.error &&
      response.error.data &&
      response.error.data.status === false
    ) {
      TOAST(response.error.data.message);
    } else {
      TOAST(response.data.message);
      navigation.replace("main");
      await AsyncStorage.setItem("@token", response.data.token);
      dispatch(setToken(response.data.token));
    }
  };

  return (
    <ScrollView style={styles.main}>
      <Text style={styles.signtext}>Welcome Back</Text>
      <Text style={styles.info}>Sign in to your account.</Text>
      {/* input field */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginScheme}
        onSubmit={(values, action) => {
          handleLogin(values, action);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          setFieldTouched,
          isValid,
          errors,
          values,
        }) => (
          <View>
            <CustomInput
              placeholder="Email"
              icon="email"
              keyboardType="email-address"
              value={values.email}
              setValue={handleChange("email")}
              blur={() => setFieldTouched("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <CustomInput
              placeholder="Password"
              icon="key"
              value={values.password}
              setValue={handleChange("password")}
              blur={() => setFieldTouched("password")}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity onPress={() => navigation.navigate("forget")}>
              <Text style={styles.forget}>Forget Password?</Text>
            </TouchableOpacity>
            <CustomButton
              title="Login"
              isValid={isValid}
              loading={loading}
              submit={handleSubmit}
            />
          </View>
        )}
      </Formik>
      {/* haven't account */}
      <View style={styles.login}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  signtext: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "900",
    color: "white",
  },
  info: {
    color: "grey",
    width: "90%",
    marginTop: 10,
    marginBottom: 15,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "700",
  },
  text: {
    color: "white",
  },
  login: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
    gap: 10,
  },
  forget: {
    color: "white",
    alignSelf: "flex-end",
    marginVertical: 4,
  },
});
