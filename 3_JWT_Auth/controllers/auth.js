const  User  = require("../models/user.js");
const { setUser } = require("../service/auth.js");


async function postSignUpHandler(req, res){

    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {  
        return res.redirect("/render/signup"); //user already exists with this email
    }               

    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        urls: []
    });

    return res.redirect("/render/signin");
}

async function getSignInHandler(req, res) {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email, password });

    if (!foundUser) return res.redirect("/render/signin"); //user does not exist

    const token = setUser(foundUser);
    res.cookie("sessionId", token);
    return res.redirect("/render/info");
}

module.exports = { postSignUpHandler, getSignInHandler };