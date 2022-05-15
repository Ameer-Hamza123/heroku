const { ObjectId } = require("mongodb");
const User = require("../models/Authenticate");
const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
    var Products = await Product.find();
    res.send(Products);
}

exports.postProducts = (req, res) => {
    const { name, description, price, inStock,image } = req.body;
    
    const product = Product({
        name, description, price, inStock,image
    })
    product.save(function (err, resp) {
        if(err){
            res.send("Please Post Product Correctly!");
        }else{
            res.send("Product Posted Successfully!");
        }
    });
}

exports.postCarts = async (req,res) => {
    console.log(req.body);
    const {userid , productid } = req.body;
    let user = await User.findById(userid);
    
    await User.findOneAndUpdate({_id:ObjectId(userid)},{$set:{cart:[...user[0].cart,productid]}}, {new: true});
    let updatedUser = await User.findById(userid);
    res.send(updatedUser);
}