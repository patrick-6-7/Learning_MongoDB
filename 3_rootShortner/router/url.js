const express = require('express');
const {PostNewShortUrlHandler, RedirectToOriginalUrlHandler, getAllExistingShortUrlsHandler} = require("../controllers/url.js");
const router = express.Router();

//routes on /url/
router.route("/")
.get(getAllExistingShortUrlsHandler)
.post(PostNewShortUrlHandler);

router.route("/:Url")
.get(RedirectToOriginalUrlHandler);

module.exports = router;