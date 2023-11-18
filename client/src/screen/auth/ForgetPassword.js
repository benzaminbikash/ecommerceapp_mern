import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { forgetPasswordSchme } from "../../utils/SignupSchme";
import { useNavigation } from "@react-navigation/native";
import CustomBack from "../../components/CustomBack";

const ForgetPassword = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <CustomBack />
      <Text style={styles.signtext}>Recover Password</Text>
      <Text style={styles.info}>
        Enter the email address associated with your account and we will send an
        email with instructions on how to recover your password.
      </Text>
      {/* input field */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={forgetPasswordSchme}
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
            <CustomButton title="Send" isValid={isValid} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ForgetPassword;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
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
