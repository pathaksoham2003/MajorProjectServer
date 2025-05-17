const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const checkRole = require('../middleware/authentication');

// All routes are protected with auth middleware
router.use(checkRole("buyer"));

// Get cart items
router.get('/', cartController.getCart);

// Add item to cart
router.post('/', cartController.addToCart);

// Update cart item quantity
router.put('/:cartItemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/:cartItemId', cartController.removeFromCart);

// Clear cart
router.delete('/', cartController.clearCart);

module.exports = router; 