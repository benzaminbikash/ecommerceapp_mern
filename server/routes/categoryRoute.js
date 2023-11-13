const express = require("express");
const router = new express();
const {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { uploadImage } = require("../middleware/uploadImage");

router.post("/create", uploadImage.single("image"), createCategory);
router.get("/allcategory", getCategory);
router.delete("/deletecategory/:_id", deleteCategory);
router.put("/updatecategory/:_id", updateCategory);

module.exports = router;
