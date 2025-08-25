const express = require("express");
const { PostNewShortUrlHandler} = require("../controllers/static.js");
const { renderUrlsInfo } = require("../controllers/static.js");
const Router = express.Router();

Router.route("/")
    .get(renderUrlsInfo);

module.exports = Router;


