// cartController.js

const Cart = require('../schema/cart.model'); // Import the Cart model
const Product = require('../schema/product.schema'); // Import the Product model

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userID = req.headers['x-user-id']; // Get userID from headers

  if (!userID) {
    return res.status(401).json({ message: 'User ID is required.' });
  }

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userID });

    if (!cart) {
      cart = new Cart({ userID, items: [] });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Item exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // New item, add to cart
      cart.items.push({ product: productId, quantity });
    }

    // Save cart
    await cart.save();
    
    res.status(200).json({ message: 'Item added to cart.', data: cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
