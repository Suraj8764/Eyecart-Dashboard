const mongoose=require("mongoose")
const dotenv=require("dotenv")
const user=require("./dataa/users");
const User=require("./dataa/models/user");
const Product=require("./dataa/models/productSchema")
const Order=require("./dataa/models/orderSchema")
const {products}=require("./dataa/data")
const connectDB=require("./config/db")
dotenv.config();
connectDB();
const importData=async()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createuser = await User.insertMany(user);

        const adminuser=createuser[0]._id;
        const sampledata=products?.map(product=>{
            return {...product,user:adminuser}
        })
        await Product.insertMany(sampledata)
        console.log("Data imported sucessfully");
        process.exit();
    } catch (error) {
        console.log("error",error)
        process.exit(1)
    }
   
}
const destroyData=async()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("data destoy sucessfully");
        process.exit()
    } catch (error) {
        console.log("error is ",error);
        process.exit(1)
    }
}
if(process.argv[2]==="-d"){
    destroyData();
}else{
    importData();
}