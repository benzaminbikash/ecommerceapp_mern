const express = require("express");
const router = new express();
const {
  createAuth,
  verifyOtp,
  loginAuth,
  editProfilePicture,
  getUserInfo,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadImage");

router.post("/register", createAuth);
router.post("/verifyotp", verifyOtp);
router.post("/login", loginAuth);
router.put(
  "/profilepicture",
  authMiddleware,
  uploadImage.single("image"),
  editProfilePicture
);
router.get("/singleinfo", authMiddleware, getUserInfo);

module.exports = router;
