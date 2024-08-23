const Cart = require('../schema/cart.model');
const Product = require('../schema/product.schema');

const services = {
  async addToCart(userId, productId, quantity) {
    try {
      // Find or create cart for the user
      let cart = await Cart.findOne({ userId });
      const product = await Product.findById(productId);

      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      // Check if product already exists in the cart
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // If product exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add it to cart
        cart.items.push({
          product: productId,
          name: product.name,
          price: product.price,
          quantity,
        });
      }

      // Save the updated cart
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw new Error('Error adding to cart');
    }
  },

  async getCartByUserId(userId) {
    try {
      const cart = await Cart.findOne({ userId }).populate('items.product', 'name price images');
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching cart');
    }
  },

  async updateCartItem(userId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) throw new Error('Cart not found');

      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        const updatedCart = await cart.save();
        return updatedCart;
      } else {
        throw new Error('Product not found in cart');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error updating cart item');
    }
  },

  async removeFromCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) throw new Error('Cart not found');

      // Filter out the product to remove from cart
      cart.items = cart.items.filter(item => item.product.toString() !== productId);

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw new Error('Error removing from cart');
    }
  },
};

module.exports = services;
