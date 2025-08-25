const URL = require("../models/url.js");

async function renderUrlsInfo(req, res) {
    const allUrl = await URL.find({});
    return res.render("home", { allUrl });
}

module.exports = { renderUrlsInfo };