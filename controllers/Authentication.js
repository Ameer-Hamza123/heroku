const User = require("../models/Authenticate");
const bcrypt = require("bcrypt");

exports.getAuth = (req, res) => {
    res.send("First Controller")
}

exports.registerUser = async (req, res) => {
    try {
        let { name, email, password, userRole } = req.body;
        password = await bcrypt.hash(password, 12);
        const user = User({
            name, email, password, userRole
        })
        user.save(async function (err, user) {
            if (err) {
                res.send("User Already Exist!")
            } else {
                let user = await User.findByEmail(email);
                res.send(user)
            }
        });
    } catch (e) {
        res.send(e);
        console.log(e);
    }
}

exports.signInUser = async (req, res) => {
    try {
        console.log(req.body.password, req.body.email);
        let { email, password } = req.body;
        let user = await User.findByEmail(email);
        console.log(user);
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (passwordMatch) {
            req.session.user = user;
            res.send(user)
        } else {
            res.send("Invalid Password")
        }
    } catch (e) {
        res.send("User Doesn't Exist");
    }
}