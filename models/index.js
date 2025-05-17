const User = require('./User');
const Shop = require('./Shop');
const Owner = require('./Owner');
const Product = require('./Product');
const Inventory = require('./Inventory');
const Address = require('./Address');

// Import associations after all models are loaded
require('./associations');

// Export all models
module.exports = {
    User,
    Shop,
    Owner,
    Product,
    Inventory,
    Address
}; 