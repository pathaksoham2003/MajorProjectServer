const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const checkRole = require('../middleware/authentication');

// Get all inventory items
router.get('/', checkRole("seller"), inventoryController.getAllInventory);

// Get inventory by ID
router.get('/:id', checkRole("seller"), inventoryController.getInventoryById);

// Create new inventory item
router.post('/', checkRole("seller"), inventoryController.createInventory);

// Update inventory item
router.put('/:id', checkRole("seller"), inventoryController.updateInventory);

// Delete inventory item
router.delete('/:id', checkRole("seller"), inventoryController.deleteInventory);

// Get inventory by pin code
router.get('/pin-code/:pin_code', checkRole(["seller","buyer"]), inventoryController.getInventoryByPinCode);

module.exports = router; 