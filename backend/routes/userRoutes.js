const express = require("express");
const asyncHandler = require("express-async-handler");
const userController = require("../controller/userController");
const router = express.Router();

// Route for user registration
router.post("/register", asyncHandler(userController.registerUser));

// Route for user login
router.post("/login", asyncHandler(userController.loginUser));

// Route for getting user details
router.get("/profile", asyncHandler(userController.getUserProfile)); // Ensure authentication middleware

module.exports = router;
