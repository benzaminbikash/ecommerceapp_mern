const express = require("express");
const router = new express();
const { uploadImage } = require("../middleware/uploadImage");
const {
  createProduct,
  getProducts,
  deleteProduct,
  getCategoryProduct,
  updateProduct,
  updateProductImage,
} = require("../controllers/productController");

router.post("/create", uploadImage.single("image"), createProduct);
router.get("/allproduct", getProducts);
router.delete("/delete/:_id", deleteProduct);
router.get("/categoryproduct/:category", getCategoryProduct);
router.put("/updateproduct/:_id", updateProduct);
router.put(
  "/updateproductimage/:_id",
  uploadImage.single("image"),
  updateProductImage
);

module.exports = router;
