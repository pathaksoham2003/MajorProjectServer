const express = require("express");
const router = express.Router();
const {getCouponsByProductId, updateCoupon, deleteCoupon, createCoupon} = require("../controllers/coupon");

router.get("/product/:shopId", getCouponsByProductId);

router.put("/:couponId", updateCoupon);

router.delete("/:couponId", deleteCoupon);

router.post("/", createCoupon);

module.exports = router;