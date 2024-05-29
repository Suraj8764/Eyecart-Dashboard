// Importing required modules
const express = require('express');
const cors = require('cors');
const { products } = require("./dataa/data");
const dotenv=require("dotenv")
const connectDB=require("./config/db")
const productRoutes=require("./routes/productRoutes")
  const userRoutes=require("./routes/userRoutes")
const checkoutRoutes=require("./routes/checkoutRoutes")
const paymentController=require("./routes/paymentRoutes")


const bodyperser=require("body-parser")

// Creating an Express application
const app = express();
app.use(express.json())
app.use(bodyperser.json());

dotenv.config();
connectDB();

app.use(cors());

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use("/api",productRoutes)
 app.use("/api",userRoutes)
app.use("/api",checkoutRoutes)
app.use("/api",paymentController)


// Start the server listening on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});

