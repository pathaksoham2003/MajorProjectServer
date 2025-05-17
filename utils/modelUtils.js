const { Shop } = require("../models");

const getShopIdFromSellerId = async (sellerId) => {
    const shop = await Shop.findOne({
      where: {
        seller_id: sellerId,
      }
    });
    if (!shop) {
      return res.status(404).json({message: "Shop not found or unauthorized"});
    }
    return shop.id;
}

module.exports = {
    getShopIdFromSellerId
}

