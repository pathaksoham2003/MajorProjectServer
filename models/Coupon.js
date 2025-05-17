const {DataTypes} = require("sequelize");
const sequelize = require("../database/sequelize");
const Shop = require("./Shop");

const Coupon = sequelize.define(
  "coupon",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isPercentage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    minOrderAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Shop,
        key: "id",
      },
    },
  },
  {
    tableName: "coupons",
    timestamps: true,
  }
);

module.exports = Coupon;
