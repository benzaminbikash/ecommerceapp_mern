const authModel = require("../models/authModel");
const { cloudinaryImage } = require("../utils/CloundinaryImage");
const { asyncHandler } = require("../utils/asyncHandler");
const { emailConfig } = require("../utils/emailConfig");
const { generateToken } = require("../utils/generaToken");
const fs = require("fs");

const createAuth = asyncHandler(async (req, res) => {
  const { email, mobile, name, password } = req.body;
  // check exist user
  const user = await authModel.findOne({ email });
  if (user) throw new Error("Email is already exit.");
  //   random OTP Number
  const randomNum = Math.floor(Math.random() * 1000000);
  let otp = randomNum.toString().padStart(6, "0");
  //   otp time 5 min
  let verify = new Date(Date.now() + 5 * 60 * 1000);
  await authModel.create({
    name,
    email,
    mobile,
    password,
    otp,
    otp_verify: verify,
  });
  await emailConfig(email, "Verify Your Account", `Your OTP is ${otp}`);
  res.status(200).json({ status: true, message: "Registration Successfully!" });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  // check otp
  if (!otp) throw new Error("OTP is required!");
  const checkOtp = await authModel.findOne({ otp });
  // check match
  if (!checkOtp) throw new Error("Otp is not correct, please check it!");
  // check verify
  if (checkOtp.verified == true)
    throw new Error("Your Email is already Verified");
  // check verify time
  if (new Date(Date.now()) > checkOtp.otp_verify)
    throw new Error("Otp Code is Expired");
  // if not verify
  await authModel.findOneAndUpdate(
    { otp },
    {
      verified: true,
    }
  );
  res.status(200).json({
    status: true,
    message: "Email is Verify now you can login.",
  });
});

const loginAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check email and password is coming or not from request
  if (!email || !password) throw new Error("Email and Password is required.");
  // check user is avaiable
  const user = await authModel.findOne({ email });
  if (!user) throw new Error("Invalid User");
  if (user.email && (await user.isPasswordMatch(password))) {
    // user verified
    // if (!user.verified) throw new Error("Your Account is not verified");
    const token = generateToken(user._id);
    res.status(200).json({
      status: true,
      message: "Login Successfully!",
      token: token,
    });
  } else {
    throw new Error("Email or password is wrong.");
  }
});

const getUserInfo = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await authModel
    .findById(_id)
    .select("-password -otp -otp_verify -verified");
  res.status(200).json({ status: true, message: "Your Data", user });
});

// edit profile picture
const editProfilePicture = asyncHandler(async (req, res) => {
  const uploadCloud = (p) => cloudinaryImage(p);
  const file = req.file.path;
  const upload = await uploadCloud(file);
  fs.unlinkSync(file);
  await authModel.findByIdAndUpdate(req.user._id, { image: upload });
  res
    .status(200)
    .json({ status: true, message: "Profile Update Successfully" });
});

// oldPassword and newPasword
const oldwithNewPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    throw new Error("Old Password and new Password must required");
  const user = await authModel.findById(req.user._id);
  const match = await user.isPasswordMatch(oldPassword);
  if (!match) throw new Error("Old password is not correct.");
  if (newPassword === oldPassword)
    throw new Error(
      "Please create new password old and new password are same."
    );
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    status: true,
    message: "Password Change Successfully!",
  });
});

module.exports = {
  createAuth,
  loginAuth,
  verifyOtp,
  editProfilePicture,
  getUserInfo,
  oldwithNewPassword,
};
