const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const Shop = require("./Shop");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.STRING, // Changed from ENUM to STRING
    allowNull: false,
  },
  brand: DataTypes.STRING,
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  rate: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  gender: {
    type: DataTypes.STRING, // Changed from ENUM to STRING
    defaultValue: "unisex",
  },
  imageUrls: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  shopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Shop, // Make sure this matches your actual table name
      key: "id",
    },
  },
}, {
  tableName: "products",
  timestamps: true,
});

module.exports = Product;
