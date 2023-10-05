const express = require('express');
const router = express.Router();
const { allProducts , specificProduct } = require("../controllers/productControllers");

router.get("/all",allProducts);
router.get("/specific/:id",specificProduct);

module.exports = router;
