const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const Product = require("./Product");
const Shop = require("./Shop");

const Inventory = sequelize.define("Inventory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  minimum_threshold: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    comment: 'Minimum quantity before low stock alert'
  },
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'shops',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  delivery_pin_codes: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    comment: 'Array of pin codes where this product can be delivered'
  }
}, {
  tableName: "inventory",
  timestamps: true,
});

// Define associations
Inventory.belongsTo(Product, { foreignKey: 'product_id' });
Inventory.belongsTo(Shop, { foreignKey: 'shop_id' });

module.exports = Inventory;
