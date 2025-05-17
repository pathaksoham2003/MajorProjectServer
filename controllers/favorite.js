const Favorite = require('../models/Favorite');
const Product = require('../models/Product');

// Get all favorites for a user
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.id },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'imageUrls', 'description']
      }]
    });
    res.status(200).json(favorites.map(favorite => favorite.Product));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a product to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    const favorite = await Favorite.create({
      userId: req.id,
      productId
    });
    const product = await Product.findByPk(productId);
    res.status(201).json(product);
  } catch (error) {
    if (error.message === 'Product is already in favorites') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Remove a product from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await Favorite.destroy({
      where: {
        userId: req.id,
        productId
      }
    });
    if (deleted) {
      res.json({ message: 'Product removed from favorites' });
    } else {
      res.status(404).json({ message: 'Favorite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if a product is in favorites
exports.checkFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const favorite = await Favorite.findOne({
      where: {
        userId: req.id,
        productId
      }
    });
    res.json({ isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
