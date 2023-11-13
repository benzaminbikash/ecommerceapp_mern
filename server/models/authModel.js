const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      default: "user",
    },
    otp: {
      type: Number,
    },
    otp_verify: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});
userSchema.methods.isPasswordMatch = async function (enterPassword) {
  return bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
