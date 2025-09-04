const express = require("express");
const { postSignUpHandler, getSignInHandler } = require("../controllers/auth.js");


const router = express.Router();

router.route("/signup")
    .post(postSignUpHandler);

router.route("/signin")
    .post(getSignInHandler);

module.exports = router;
