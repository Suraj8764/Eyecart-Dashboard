
// routes/paymentRoutes.js
const express = require('express');
const { createPhonePePayment } = require("../controller/paymentController")

const router = express.Router();

router.post('/phonepe-payment', createPhonePePayment);

module.exports = router;
