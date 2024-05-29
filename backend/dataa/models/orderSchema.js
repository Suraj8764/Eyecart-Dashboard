// orderModel.js

const mongoose = require('mongoose');

// Define shipping address schema
const shippingAddressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  }
});

// Define order schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  shippingAddress: shippingAddressSchema,
  payment: {
    type: String,
    required: true
  }
  ,totalprice:{
    type:Number,
    required:true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
