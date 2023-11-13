import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Formik } from "formik";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { SignupSchema } from "../../utils/SignupSchme";
import { SIZE, TOAST } from "../../constants/constants";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRegistrationMutation } from "../../redux/Api/userApi";

const Register = () => {
  const navigation = useNavigation();
  const [registerApi] = useRegistrationMutation();
  const [loading, setLoading] = useState(false);
  const handleRegistration = async (v, a) => {
    setLoading(true);
    const response = await registerApi({
      name: v.name,
      email: v.email,
      mobile: v.phone,
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
      a.resetForm();
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-500}
      behavior="height"
      style={styles.main}
    >
      <Text style={styles.signtext}>Sign Up</Text>
      <Text style={styles.info}>
        Create an account so you can order your favorite products easily and
        quickly.
      </Text>
      {/* input field */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmationpassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          handleRegistration(values, actions);
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
              placeholder="Name"
              icon="account"
              value={values.name}
              setValue={handleChange("name")}
              blur={() => setFieldTouched("name")}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}
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
              placeholder="Mobile Number"
              icon="phone"
              keyboardType="phone-pad"
              value={values.phone}
              setValue={handleChange("phone")}
              blur={() => setFieldTouched("phone")}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
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
            <CustomInput
              placeholder="Confirmation Password"
              icon="key"
              value={values.confirmationpassword}
              setValue={handleChange("confirmationpassword")}
              blur={() => setFieldTouched("confirmationpassword")}
              secureTextEntry={true}
            />
            {touched.confirmationpassword && errors.confirmationpassword && (
              <Text style={styles.error}>{errors.confirmationpassword}</Text>
            )}
            <CustomButton
              title="Registration"
              isValid={isValid}
              submit={handleSubmit}
              loading={loading}
            />
          </View>
        )}
      </Formik>
      {/* line info */}
      <View style={styles.ormain}>
        <Text style={styles.line}></Text>
        <Text style={styles.or}>Or Continue With</Text>
        <Text style={styles.line}></Text>
      </View>
      {/* register with social media */}
      <View style={styles.online}>
        <TouchableOpacity style={styles.facebook}>
          <FontAwesome name="facebook-f" size={24} color="white" />
          <Text style={styles.text}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebook}>
          <FontAwesome name="google" size={24} color="white" />
          <Text style={styles.text}>Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.login}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
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
  or: {
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  line: {
    borderWidth: 1,
    borderColor: "grey",
    height: 0.6,
    width: 100,
  },
  ormain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  facebook: {
    padding: 10,
    width: SIZE.WIDTH / 2.5,
    alignItems: "center",
    borderRadius: 1,
    borderWidth: 0.4,
    borderColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    elevation: 210,
  },
  online: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
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
});
