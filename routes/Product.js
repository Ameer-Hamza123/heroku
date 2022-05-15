const express = require("express");
const productController = require("../controllers/Product");
const router = express.Router();

router.get("/",productController.getProducts);

router.post("/post",productController.postProducts);

router.post("/addcart",productController.postCarts);

module.exports = router;