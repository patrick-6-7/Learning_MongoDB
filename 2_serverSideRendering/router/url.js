const express = require("express");
const {
    PostNewShortUrlHandler,
    RedirectToOriginalUrlHandler, 
} = require("../controllers/url.js");

const Router = express.Router();

Router.route("/")
    .post(PostNewShortUrlHandler);

Router.route("/:Url")
    .get(RedirectToOriginalUrlHandler);

module.exports = Router;


