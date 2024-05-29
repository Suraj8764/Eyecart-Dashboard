// productModel.js

const mongoose = require('mongoose');

// Define review schema
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  }
},{timestamps:true});

// Define product schema
const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  specs: [String],
  image: [String],
    
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  size:{
type:String,
required:false
  },
  brand: {
    type: String,
    
  },
  additionalCategories: [String],
  reviews: [reviewSchema], 
  rating:{
    type:String,
    required:true
  }
  ,
  reviews:{
    type:Number,
    required:true
  }
  ,inStock:{
    type:Number,
    required:true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
