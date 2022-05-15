const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    userRole:{type:String,required:true},
    cart:[{type:mongoose.Types.ObjectId,ref:"Product",default:[],unique:true}]
},{collection:"Users"})

userSchema.static('findByEmail',function(email){
    return this.find({email}).populate('cart');
})

userSchema.static('findById',function(userid){
    return this.find({_id:ObjectId(userid)}).populate('cart');
})

const User = mongoose.model("User",userSchema);
module.exports = User; 