const express = require("express");
const app = express();
const mongoose = require("./db")
const authRouter = require("./routes/Authentication")
const bodyParser = require("body-parser");
const session = require('express-session');
const productRoute = require("./routes/Product");

console.log(process.env.SECRET);

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    });
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

app.use("/auth", authRouter);

app.use("/products", productRoute);

app.use((req, res) => {
    res.send("Page Not Found!");
})
app.listen(5000);