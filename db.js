const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/shop').then(()=>{console.log("Connected to Database");});

module.exports = mongoose;