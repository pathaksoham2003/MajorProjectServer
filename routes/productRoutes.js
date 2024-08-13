const express = require('express');
const router = express.Router();
const { allProducts , specificProduct , createProduct, byCategory, checkoutProduct } = require("../controllers/productControllers");

router.get("/all",allProducts);
router.get("/specific/:id",specificProduct);
router.get("/category/:category",byCategory);
router.post("/create",createProduct);
router.post("/checkout",checkoutProduct);


module.exports = router;
