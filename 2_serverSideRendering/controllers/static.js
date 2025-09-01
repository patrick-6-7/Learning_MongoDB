const USER = require("../models/user.js");
const {getUser} = require("../service/auth.js");

async function renderUrlsInfo(req, res) {
    // const sessionId = req.cookies.sessionId;
    // const currUser = getUser(sessionId);

    const user = await USER.findOne({ email: req.user.email });

    const allUrl = user.urls;
    return res.render("home", { allUrl });
}

async function renderSignUpPage(req, res) {
    return res.render("signUp");
}

async function renderSignInPage(req, res) {
    return res.render("signIn");
}

module.exports = { 
    renderUrlsInfo, 
    renderSignUpPage,
    renderSignInPage
};