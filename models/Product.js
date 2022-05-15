const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    inStock:{type:Boolean,required:true}, 
    image:{type:String,required:true}
},{collection:"Products"});

const Product = mongoose.model("Product",productSchema);

module.exports = Product;