const express = require("express");
const router = new express();
const {
  addtoCart,
  MyCart,
  removeCart,
  increaseQty,
  decreaseQty,
} = require("../controllers/addCartController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addtoCart);
router.get("/mycart", authMiddleware, MyCart);
router.delete("/deletecart/:_id", authMiddleware, removeCart);
router.put("/cartincrease/:_id", authMiddleware, increaseQty);
router.put("/cartdecrease/:_id", authMiddleware, decreaseQty);

module.exports = router;
