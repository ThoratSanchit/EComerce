// cart.routes.js

const express = require("express");
const router = express.Router();
const Cart = require("../schema/cart.model"); 
const Product = require("../schema/product.schema"); 
const cartService = require("../services/cart.service");

router.post("/add-to-cart", cartService.addToCart);

router.get("/get-cart", async (req, res) => {
  const userID = req.headers["x-user-id"]; 

  if (!userID) {
    return res.status(401).json({ message: "User ID is required." });
  }

  try {

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

module.exports = router;
