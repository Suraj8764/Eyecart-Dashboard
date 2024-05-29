// controllers/paymentController.js
const axios = require('axios');
const crypto = require('crypto');
const Transaction = require("../dataa/models/TranscationSchema")

exports.createPhonePePayment = async (req, res) => {
  const { userId, orderId, amount, paymentMethod } = req.body;

  // Generate a unique transaction ID
  const merchantTransactionId = `TXN_${Date.now()}`;

  const payload = {
    merchantId: 'your-phonepe-merchant-id',
    merchantTransactionId,
    merchantUserId: userId,
    amount,
    callbackUrl: 'http://localhost:3000/callback',
    paymentInstrument: {
      type: 'PAY_PAGE',
    },
  };

  const payloadString = JSON.stringify(payload);
  const secretKey = 'your-phonepe-secret-key';
  const salt = 'your-phonepe-salt';
  const base64EncodedBody = Buffer.from(payloadString).toString('base64');
  const xVerify = crypto.createHash('sha256').update(base64EncodedBody + '/pg/v1/pay' + secretKey).digest('hex') + '###' + salt;

  try {
    const response = await axios.post('https://api.phonepe.com/apis/pg/v1/pay', payloadString, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
        'X-MERCHANT-ID': 'your-phonepe-merchant-id',
      },
    });

    // Save transaction details to the database
    const transaction = new Transaction({
      userId,
      orderId,
      paymentMethod,
      amount,
      transactionId: merchantTransactionId,
      status: 'Pending',
    });
    await transaction.save();

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
