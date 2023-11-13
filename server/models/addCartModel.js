const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  qty: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("cart", userSchema);
