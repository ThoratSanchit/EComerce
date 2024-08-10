// router.js
const express = require("express");
const services = require("../services/ecomerce.service");
const router = express.Router();
const upload = require('../uploadConfig/uploadConfig'); // Import multer config

// POST API for adding a product
router.post("/add/product", upload.array('images', 5), async (req, res) => {
  try {
    const productData = req.body;
    
    // Ensure images are uploaded
    if (!req.files) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    // Generate image URLs
    const imageUrls = req.files.map(file => ({
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      alt: productData.name || 'Product image'
    }));

    // Add images to product data
    productData.images = imageUrls;
    

    // Create product using service
    const data = await services.createProduct(productData);
    
    res.json({
      status: res.statusCode,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/allProducts", async (req, res) => {
  try {
    const allProducts = await services.getAllProducts({});

    res.send({
      status: res.statusCode,
      message: "success",
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    throw Error;
  }
});

// Pagination for fetching all products
router.get('/allProducts/pagination', async (req, res) => {
    try {
        // Extract page and limit from query parameters, with default values
        const { page = 1, limit = 10 } = req.query;

        // Ensure page and limit are integers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Calculate skip value
        const skip = (pageNumber - 1) * limitNumber;

        // Fetch products with pagination
        const allProducts = await services.getAllProductsPage({}, skip, limitNumber);

        // Fetch the total number of products for pagination info
        const totalProducts = await services.countAllProducts();

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / limitNumber);

        // Return response with pagination info
        res.send({
            status: res.statusCode,
            message: "success",
            data: {
                products: allProducts,
                currentPage: pageNumber,
                totalPages,
                totalProducts,
                pageSize: limitNumber
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: res.statusCode,
            message: "An error occurred",
            error: error.message
        });
    }
});

router.get("/getProductById/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await services.getProductById(productId);
    res.send({
      status: res.statusCode,
      message: "success",
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    throw Error;
  }
});

router.put("/updateProduct/:productId", async (req, res) => {
  try {
    const updateProduct = await services.updateProduct(
      req.params.productId,
      req.body
    );
    res.send({
      status: res.statusCode,
      message: "success",
      data: updateProduct,
    });
  } catch (error) {
    console.log(error);
    throw Error;
  }
}),
  router.delete("/deleteData/:productId", async (req, res) => {
    try {
      const deleteProduct = await services.deleteProduct(req.params.productId);
      res.send({
        status: res.statusCode,
        message: "success",
        data: deleteProduct,
      });
    } catch (error) {
      console.log(error);
      throw Error;
    }
  });

router.delete("/deleteProduct");

module.exports = router;
