const express = require('express');
const router = express.Router();
const { allProducts , specificProduct , createProduct } = require("../controllers/productControllers");

router.get("/all",allProducts);
router.get("/specific/:id",specificProduct);

router.post("/create",createProduct);

module.exports = router;
