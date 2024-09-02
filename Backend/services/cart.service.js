const Cart = require('../schema/cart.model');
const Product = require('../schema/product.schema');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.SECRET_KEY || '12345'; 

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  const token = authHeader.split(' ')[1]; 

  try {
  
    const decoded = jwt.verify(token, jwtSecret); 
    const userID = decoded.user.id; // this is my registration time generated userID
    console.log(userID)
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ userID });
    if (!cart) {
      cart = new Cart({ userID, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: 'Product added to cart.', data: cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
