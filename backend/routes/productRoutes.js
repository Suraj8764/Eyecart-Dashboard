const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const productController = require("../controller/productController") // Import the controller

// Route to get all products
router.get("/products", asyncHandler(productController.getAllProducts));

// Route to get a product by ID
router.get("/products/:id", asyncHandler(productController.getProductById));

module.exports = router;
