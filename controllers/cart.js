const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart items for a user
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.id },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'imageUrls', 'description']
      }]
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if item already exists in cart
    const existingItem = await Cart.findOne({
      where: {
        userId: req.id,
        productId
      }
    });

    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity += quantity;
      await existingItem.save();
      
      const updatedItem = await Cart.findByPk(existingItem.id, {
        include: [{
          model: Product,
          attributes: ['id', 'name', 'price', 'imageUrls', 'description']
        }]
      });
      
      res.status(200).json(updatedItem);
    } else {
      // Create new cart item
      const cartItem = await Cart.create({
        userId: req.id,
        productId,
        quantity
      });

      const newItem = await Cart.findByPk(cartItem.id, {
        include: [{
          model: Product,
          attributes: ['id', 'name', 'price', 'imageUrls', 'description']
        }]
      });

      res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      where: {
        id: cartItemId,
        userId: req.id
      }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    const updatedItem = await Cart.findByPk(cartItemId, {
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'imageUrls', 'description']
      }]
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const deleted = await Cart.destroy({
      where: {
        id: cartItemId,
        userId: req.id
      }
    });

    if (deleted) {
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.destroy({
      where: { userId: req.id }
    });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 