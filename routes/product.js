const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({dest: "uploads/"});

const {
  createProduct,
  getAllProducts,
  getProductById,
  getFilterOptions,
  filterProducts,
  updateProduct,
} = require("../controllers/product");
const checkRole = require("../middleware/authentication");

router.post("/", upload.array("images", 3), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/filters/options", getFilterOptions);
router.post("/filters", filterProducts);
router.put("/:id", updateProduct);

module.exports = router;
