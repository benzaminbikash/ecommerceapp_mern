const productModel = require("../models/productModel");
const { asyncHandler } = require("../utils/asyncHandler");
const { cloudinaryImage } = require("../utils/CloundinaryImage");
const fs = require("fs");
const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;
  const cloudUpload = (link) => cloudinaryImage(link);
  const fileUrl = req.file.path;
  const upload = await cloudUpload(fileUrl);
  fs.unlinkSync(fileUrl);
  const data = await productModel.create({
    title,
    description,
    price,
    category,
    image: upload,
  });
  res.status(200).json({
    status: true,
    message: "Product Create Successfully!",
    data,
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((item) => delete queryObj[item]);
  let queryStr = JSON.stringify(queryObj);
  // price[gte]=50000,  for greater, price[gte]=10000 & price[lte]=40000 [ for between 10000-40000]
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = productModel.find(JSON.parse(queryStr));

  // search with title
  if (req.query.title) {
    query = query.where("title", new RegExp(req.query.title, "i"));
  }

  // sorting
  if (req.query.sort) {
    const data = req.query.sort.split(",").join(" ");
    query = query.sort(data);
  } else {
    query = query.sort("-createdAt");
  }

  // pagination
  // const page = req.query.page;
  // const limit = req.query.limit || 2;
  // const skip = (page - 1) * limit;
  // query = query.skip(skip).limit(limit);

  let data = await query;

  res.status(200).json({
    status: true,
    message: "Products!",
    total: data.length,
    data,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const data = await productModel.findByIdAndDelete(_id);
  res
    .status(200)
    .json({ status: true, message: "Delete Product Successfully!", data });
});

const getCategoryProduct = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const product = await productModel.find({ category });

  res
    .status(200)
    .json({ status: true, message: "Only Category Products", data: product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;
  const { _id } = req.params;
  const product = await productModel.findById({ _id });
  console.log(product);
  await productModel.findByIdAndUpdate(
    { _id },
    {
      title: title || product.title,
      description: description || product.description,
      price: price,
    }
  );
  res.status(200).json({
    status: true,
    message: "Update Product!",
  });
});
const updateProductImage = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const uploadImage = (p) => cloudinaryImage(p);
  const path = req.file.path;
  const upload = await uploadImage(path);
  fs.unlinkSync(path);
  await productModel.findByIdAndUpdate(
    { _id },
    {
      image: upload,
    }
  );
  res.status(200).json({ status: true, message: "Product Image Update" });
});

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  getCategoryProduct,
  updateProduct,
  updateProductImage,
};
