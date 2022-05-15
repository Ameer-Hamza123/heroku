const express = require("express");
const { getAuth, registerUser ,signInUser} = require("../controllers/Authentication");
const router = express.Router();

router.get("/",getAuth);

router.post("/signup",registerUser);

router.post("/signin",signInUser);

module.exports = router;