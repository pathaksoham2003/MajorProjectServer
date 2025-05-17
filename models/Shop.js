const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Owner = require('./Owner'); // Import the Owner model

const Shop = sequelize.define('Shop', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gst: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categories: {
    type: DataTypes.JSON, // Storing as a JSON array
    allowNull: false,
  },
  location: {
    type: DataTypes.JSON, // { lat: number, lng: number }
    allowNull: false,
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "owners",
      key: "id",
    },
  },
}, {
  tableName: 'shops',
  timestamps: true,
});

module.exports = Shop;
