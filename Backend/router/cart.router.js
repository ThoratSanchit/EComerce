const express = require('express');
const services = require('../services/cart.service');
const router = express.Router();
const { authenticateToken } = require('../router/user.router'); // Correct import

// Add product to cart
router.post('/add-to-cart', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.user.id;

    const updatedCart = await services.addToCart(userId, productId, quantity);
    
    res.json({
      status: res.statusCode,
      message: 'Product added to cart',
      data: updatedCart,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// View cart
router.get('/view-cart', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user.id;
    const cart = await services.getCartByUserId(userId);

    res.json({
      status: res.statusCode,
      message: 'Cart fetched successfully',
      data: cart,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product quantity in cart
router.put('/update-cart', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.user.id;

    const updatedCart = await services.updateCartItem(userId, productId, quantity);

    res.json({
      status: res.statusCode,
      message: 'Cart updated successfully',
      data: updatedCart,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove product from cart
router.delete('/remove-from-cart/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user.id;
    const productId = req.params.productId;

    const updatedCart = await services.removeFromCart(userId, productId);

    res.json({
      status: res.statusCode,
      message: 'Product removed from cart',
      data: updatedCart,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
