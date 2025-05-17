const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');
const Product = require('./Product');

const Favorite = sequelize.define('favorites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  }
}, {
  tableName: 'favorites',
  timestamps: true,
});

Favorite.addHook('beforeCreate', async (favorite) => {
  const existingFavorite = await Favorite.findOne({
    where: {
      userId: favorite.userId,
      productId: favorite.productId
    }
  });
  if (existingFavorite) {
    throw new Error('Product is already in favorites');
  }
});

module.exports = Favorite;
