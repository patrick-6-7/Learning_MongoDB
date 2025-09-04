const express = require("express");
const {
    PostNewShortUrlHandler,
    RedirectToOriginalUrlHandler, 
    DeleteShortUrlHandler,
} = require("../controllers/url.js");

const Router = express.Router();

Router.route("/")
    .post(PostNewShortUrlHandler);

Router.route("/:Url")
    .get(RedirectToOriginalUrlHandler)
    .delete(DeleteShortUrlHandler);

module.exports = Router;


