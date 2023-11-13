const addCartModel = require("../models/addCartModel");
const productModel = require("../models/productModel");
const { asyncHandler } = require("../utils/asyncHandler");

const addtoCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { product, qty } = req.body;
  const data = await addCartModel.create({
    product: product,
    qty: qty,
    user: _id,
  });
  res.status(200).json({
    status: true,
    message: "Add to Cart!",
    data,
  });
});

const MyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const carts = await addCartModel
    .find({ user: _id })
    .populate("product")
    .select("-user");
  res.status(200).json({
    status: true,
    message: "My Carts",
    data: carts,
  });
});

const removeCart = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const product = await addCartModel.findByIdAndDelete({ _id });
  res.status(200).json({ status: true, message: "Remove Cart", data: product });
});

const increaseQty = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  await addCartModel.findByIdAndUpdate(
    { _id },
    {
      $inc: { qty: 1 },
    }
  );
  res.status(200).json({ status: true, message: "Cart Qty Increase" });
});

const decreaseQty = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const item = await addCartModel.findById({ _id });
  if (item.qty > 1) {
    await addCartModel.findByIdAndUpdate(
      { _id },
      {
        $inc: { qty: -1 },
      }
    );
    res.status(200).json({ status: true, message: "Cart Qty Decrease" });
  } else {
    throw new Error("You can decrease less than 1.");
  }
});

module.exports = {
  addtoCart,
  MyCart,
  removeCart,
  increaseQty,
  decreaseQty,
};
