const { Inventory, Product, Shop } = require('../models');
const { Op } = require('sequelize');
const { getShopIdFromSellerId } = require('../utils/modelUtils');

const getAllInventory = async (req, res) => {
  try {
    const shop_id = await getShopIdFromSellerId(req.id);
    const inventory = await Inventory.findAll({
      where: { shop_id },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'description', 'imageUrls', 'price']
      }]
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const shop_id = await getShopIdFromSellerId(req.id);
    const inventory = await Inventory.findOne({
      where: {
        id: req.params.id,
        shop_id
      },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'description', 'imageUrls', 'price']
      }]
    });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new inventory item
const createInventory = async (req, res) => {
  try {
    const { product_id, quantity, minimum_threshold, delivery_pin_codes } = req.body;
    const shop_id = await getShopIdFromSellerId(req.id);

    const inventory = await Inventory.create({
      product_id,
      shop_id,
      quantity,
      minimum_threshold,
      delivery_pin_codes: delivery_pin_codes || [],
      status: 'active'
    });

    const createdInventory = await Inventory.findByPk(inventory.id, {
      include: [{
        model: Product,
        attributes: ['id', 'name', 'description', 'imageUrls', 'price']
      }]
    });

    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update inventory item
const updateInventory = async (req, res) => {
  try {
    const { quantity, minimum_threshold, delivery_pin_codes, status } = req.body;
    const shop_id = await getShopIdFromSellerId(req.id);
    
    const inventory = await Inventory.findOne({
      where: {
        id: req.params.id,
        shop_id
      }
    });
    
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    // Update fields if they are provided
    if (quantity !== undefined) inventory.quantity = quantity;
    if (minimum_threshold !== undefined) inventory.minimum_threshold = minimum_threshold;
    if (delivery_pin_codes !== undefined) inventory.delivery_pin_codes = delivery_pin_codes;
    if (status !== undefined) inventory.status = status;

    await inventory.save();

    const updatedInventory = await Inventory.findByPk(inventory.id, {
      include: [{
        model: Product,
        attributes: ['id', 'name', 'description', 'imageUrls', 'price']
      }]
    });

    res.json(updatedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete inventory item
const deleteInventory = async (req, res) => {
  try {
    const shop_id = await getShopIdFromSellerId(req.id);
    const inventory = await Inventory.findOne({
      where: {
        id: req.params.id,
        shop_id
      }
    });
    
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    await inventory.destroy();
    res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get inventory by pin code
const getInventoryByPinCode = async (req, res) => {
  try {
    const { pin_code } = req.params;
    const inventory = await Inventory.findAll({
      where: {
        delivery_pin_codes: {
          [Op.contains]: [pin_code]
        },
        status: 'active'
      },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'description', 'imageUrls', 'price']
      }]
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryByPinCode
};
