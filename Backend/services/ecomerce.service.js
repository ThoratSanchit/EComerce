// ecomerce.service.js
const model = require('../schema/product.schema');

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

  async getAllProducts(filter = {}) {
    try {
      const allProducts = await model.find(filter);
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
      const updateProduct = await model.findByIdAndUpdate(productId, newData, {
        new: true,
      });
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
  },
  async searchProducts(searchQuery) {
    try {
      // Create a dynamic filter based on search query
      const filter = {};
  
      if (searchQuery.keyword && searchQuery.keyword.trim() !== '') {
        const regex = { $regex: searchQuery.keyword, $options: 'i' }; // Case-insensitive search
  
        filter.$or = [
          { name: regex },
          { brand: regex },
          { category: regex },
          { description: regex } // Assuming 'description' is a field in the product schema
        ];
      } else {
        // Return an empty array if the keyword is empty or not provided
        return [];
      }
  
      const searchResults = await model.find(filter);
  
      // Return results or an empty array if no results found
      return searchResults.length > 0 ? searchResults : [];
    } catch (error) {
      console.log(error);
      throw new Error("Error searching products");
    }
  }
  
  
};

module.exports = services;
