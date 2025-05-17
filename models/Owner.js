const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Shop = require('./Shop'); // Import the Shop model

const Owner = sequelize.define('Owner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, 
    validate: {
      is: /^[0-9\-+()\s]*$/, 
    },
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'owners',
  timestamps: true,
});

module.exports = Owner;
