import * as Yup from "yup";
export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Too Short!")
    .max(30, "Too Long!")
    .required("Name is Required!"),
  email: Yup.string().email("Invalid email").required("Email is Required!"),
  phone: Yup.string()
    .min(10, "Number must be 10 digits!")
    .max(10, "Number must be 10 digits!")
    .required("Mobile number is Required!"),
  password: Yup.string()
    .min(8, "Password must be 8 digits!")
    .required("Password is required!"),
  confirmationpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password is not match!")
    .required("Confirmation Password is required!"),
});

export const loginScheme = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required!"),
  password: Yup.string()
    .min(8, "Password must be 8 digits!")
    .required("Password is required!"),
});

export const forgetPasswordSchme = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required!"),
});
