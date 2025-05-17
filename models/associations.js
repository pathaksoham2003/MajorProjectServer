const User = require("./User");
const Owner = require("./Owner");
const Shop = require("./Shop");
const Product = require("./Product");
const Inventory = require("./Inventory");
const Address = require("./Address");
const Favorite = require("./Favorite");
const Cart = require("./Cart");
const Coupon = require("./Coupon");

// User Associations
User.hasMany(Address, {foreignKey: "user_id"});
Address.belongsTo(User, {foreignKey: "user_id"});

// Owner Associations
Owner.hasMany(Shop, {foreignKey: "seller_id", as: "shops"});
Shop.belongsTo(Owner, {foreignKey: "seller_id", as: "owner"});

// Shop Associations
Shop.hasMany(Product, {foreignKey: "shop_id"});
Product.belongsTo(Shop, {foreignKey: "shop_id"});

Shop.hasMany(Inventory, {foreignKey: "shop_id"});
Inventory.belongsTo(Shop, {foreignKey: "shop_id"});

// Product Associations
Product.hasMany(Inventory, {foreignKey: "product_id"});
Inventory.belongsTo(Product, {foreignKey: "product_id"});

// Favorite Associations
User.hasMany(Favorite, {foreignKey: "userId"});
Favorite.belongsTo(User, {foreignKey: "userId"});

Product.hasMany(Favorite, {foreignKey: "productId"});
Favorite.belongsTo(Product, {foreignKey: "productId"});

User.hasMany(Cart, {foreignKey: "userId"});
Cart.belongsTo(User, {foreignKey: "userId"});

Product.hasMany(Cart, {foreignKey: "productId"});
Cart.belongsTo(Product, {foreignKey: "productId"});

User.hasMany(Address, {foreignKey: "user_id"});
Address.belongsTo(User, {foreignKey: "user_id"});

Coupon.belongsTo(Shop, {foreignKey: "shopId"});
Shop.hasMany(Coupon, {foreignKey: "shopId"});

module.exports = {
  User,
  Owner,
  Shop,
  Product,
  Inventory,
  Address,
  Favorite,
  Cart,
  Coupon,
};
