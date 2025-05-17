const {Coupon} = require("../models/associations");


const getCouponsByProductId = async (req, res) => {
    const {shopId} = req.params;
    try {
        const coupons = await Coupon.findAll({
            where: {shopId}
        });
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch coupons"});
    }
}

const updateCoupon = async (req, res) => {
    const {couponId} = req.params;
    const {code, discount, expiryDate, isPercentage, minOrderAmount} = req.body;
    try {
        const [updated] = await Coupon.update({code, discount, expiryDate, isPercentage, minOrderAmount}, {where: {id: couponId}});
        if (updated === 0) {
            return res.status(404).json({error: "Coupon not found"});
        }
        res.status(200).json({message: "Coupon updated successfully"}); 
    } catch (error) {
        res.status(500).json({error: "Failed to update coupon"});
    }
}   

const deleteCoupon = async (req, res) => {
    const {couponId} = req.params;
    try {
        const deleted = await Coupon.destroy({where: {id: couponId}});
        if (deleted === 0) {
            return res.status(404).json({error: "Coupon not found"});
        }
        res.status(200).json({message: "Coupon deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete coupon"});
    }
}

const createCoupon = async (req, res) => {
    const {code, discount, expiryDate, isPercentage, shopId, minOrderAmount} = req.body;
    try {
        const coupon = await Coupon.create({code, discount, expiryDate, isPercentage, shopId, minOrderAmount});
        res.status(201).json(coupon);
    } catch (error) {
        res.status(500).json({error: "Failed to create coupon"});
    }
}



module.exports = {getCouponsByProductId, updateCoupon, deleteCoupon, createCoupon};
