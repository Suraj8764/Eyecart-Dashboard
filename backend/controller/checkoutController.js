// controllers/checkoutController.js
const Checkout = require("../dataa/models/checkout")

exports.createCheckout = async (req, res) => {
  try {
    const { shippingInfo, billingInfo, paymentInfo } = req.body;

    // Create a new checkout document
    const checkout = new Checkout({
      shippingInfo,
      billingInfo,
      paymentInfo,
    });

    // Save the checkout document to the database
    await checkout.save();

    res.status(201).json({ message: 'Checkout information saved successfully', checkout });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save checkout information', error });
  }
};
