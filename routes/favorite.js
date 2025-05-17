const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite');
const checkRole = require('../middleware/authentication');

// All routes require authentication
router.use(checkRole("buyer"));

// Get all favorites
router.get('/', favoriteController.getFavorites);

// Add to favorites
router.post('/', favoriteController.addToFavorites);

// Remove from favorites
router.delete('/:productId', favoriteController.removeFromFavorites);

// Check if product is in favorites
router.get('/check/:productId', favoriteController.checkFavorite);

module.exports = router;
