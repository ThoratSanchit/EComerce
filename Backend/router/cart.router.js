const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Cart = require("../schema/cart.model");
const Product = require("../schema/product.schema");
const cartService = require("../services/cart.service");

router.post("/add-to-cart", cartService.addToCart);

router.get("/get-cart", async (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "12345"); 
    const userID = decoded.user.id;

    const cart = await Cart.findOne({ userID }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    let totalAmount = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    res.status(200).json({ data: cart, totalAmount });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.delete("/remove-from-cart", async (req, res) => {
  const { productId } = req.body;
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "12345");
    const userID = decoded.user.id;

    const cart = await Cart.findOne({ userID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart.", data: cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.put("/update-cart", async (req, res) => {
  const { productId, quantity } = req.body;
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "12345");
    const userID = decoded.user.id;

    const cart = await Cart.findOne({ userID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({ message: "Cart updated.", data: cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
