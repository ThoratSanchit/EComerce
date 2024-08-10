// service.js
const model = require('../models/ecomerce.schema');

const services = {
  async createProduct(product) {
    try {
      const prod = await model.create(product);
      return prod;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating product");
    }
  },

  async getAllProducts() {
    try {
      const allProducts = await model.find();
      return allProducts;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching all products");
    }
  },

  async getProductById(productId) {
    try {
      const getProduct = await model.findById(productId);
      return getProduct;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching product by ID");
    }
  },

  async updateProduct(productId, newData) {
    try {
      const updateProduct = await model.findByIdAndUpdate(productId, newData, { new: true });
      return updateProduct;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating product");
    }
  },

  async deleteProduct(productId) {
    try {
      const deleteProduct = await model.findByIdAndDelete(productId);
      return deleteProduct;
    } catch (error) {
      console.log(error);
      throw new Error("Error deleting product");
    }
  },

  async getAllProductsPage(filter, skip, limit) {
    try {
      const allProducts = await model.find(filter).skip(skip).limit(limit);
      return allProducts;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching paginated products");
    }
  },

  async countAllProducts(filter) {
    try {
      const count = await model.countDocuments(filter);
      return count;
    } catch (error) {
      console.log(error);
      throw new Error("Error counting products");
    }
  }
};

module.exports = services;
