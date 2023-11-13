const categoryModel = require("../models/categoryModel");
const { cloudinaryImage } = require("../utils/CloundinaryImage");
const { asyncHandler } = require("../utils/asyncHandler");
const fs = require("fs");

// create Category
const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const findCategory = await categoryModel.findOne({ title });
  if (findCategory) throw new Error("Title must be new one!");
  const cloudPath = (path) => cloudinaryImage(path);
  const fileUrl = req.file.path;
  const upload = await cloudPath(fileUrl);
  fs.unlinkSync(fileUrl);
  const data = await categoryModel.create({
    title,
    image: upload,
  });
  res.status(200).json({
    status: true,
    message: "Category Create Successfully!",
    data,
  });
});
//all category
const getCategory = asyncHandler(async (req, res) => {
  const data = await categoryModel.find();
  res.status(200).json({
    status: true,
    message: "All Category",
    data,
  });
});
//delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  await categoryModel.findByIdAndDelete(_id);
  res.status(200).json({
    status: true,
    message: "Delete Category",
  });
});
//update category
const updateCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { _id } = req.params;
  console.log(title);
  await categoryModel.findByIdAndUpdate(
    { _id },
    {
      title: title,
    }
  );
  res.status(200).json({ status: true, message: "Update Category", title });
});

module.exports = {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};
