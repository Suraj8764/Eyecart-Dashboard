// routes/checkoutRoutes.js
const express = require('express');
const { createCheckout } = require("../controller/checkoutController")

const router = express.Router();

router.post('/checkout', createCheckout);

module.exports = router;
