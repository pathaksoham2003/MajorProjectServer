// routes/shopRoute.js

const express = require("express");
const {
  createShop,
  updateShop,
  getShopBySeller,
  getShopProducts,
  filterProducts,
  getFilterOptions,
} = require("../controllers/shopController"); // Import controller functions
const checkRole = require("../middleware/authentication"); // Authentication middleware

const router = express.Router();

// Middleware to check if the user is a seller
router.use(checkRole("seller")); // Only allow sellers to perform these actions

// Route to create a new shop
router.post("/", createShop);

// Route to update shop details
router.put("/:id", updateShop);

router.get("/products/", getShopProducts);
// Route to get shop details by seller
router.get("/:seller_id", getShopBySeller);

router.post("/filters/",filterProducts)
router.post("/filters/options",getFilterOptions)

module.exports = router;
