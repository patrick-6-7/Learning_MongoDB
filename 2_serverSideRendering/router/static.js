const express = require("express");
const { renderUrlsInfo, renderSignUpPage, renderSignInPage } = require("../controllers/static.js");
const {restrictToLoggedInUserOnly, logOutIfSignInCalledAgain} = require("../middlewares/auth.js");

const Router = express.Router();

Router.route("/info")
    .get(restrictToLoggedInUserOnly, renderUrlsInfo);

Router.route("/signup")
    .get(logOutIfSignInCalledAgain, renderSignUpPage);

Router.route("/signin")
    .get(logOutIfSignInCalledAgain, renderSignInPage);

module.exports = Router;


