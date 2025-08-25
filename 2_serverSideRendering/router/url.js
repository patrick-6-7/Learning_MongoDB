const express = require("express");
const {
    PostNewShortUrlHandler,
    RedirectToOriginalUrlHandler, 
    getAllExistingShortUrlsHandler,
    renderAllExistingShortUrlsHandler
} = require("../controllers/url.js");

const Router = express.Router();

Router.route("/")
    .get(getAllExistingShortUrlsHandler)
    .post(PostNewShortUrlHandler);

Router.route("/:Url")
    .get(RedirectToOriginalUrlHandler);

module.exports = Router;


