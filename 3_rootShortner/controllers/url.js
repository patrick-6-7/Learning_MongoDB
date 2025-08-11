const URL = require("../models/url.js");
const shortid = require('shortid');


async function handleGenerateNewShortUrl(req, res) {
    const shortId = shortid.generate();

    await URL.create({ 
        shortUrl: shortId,
        originalUrl: req.body.url,
        visitHistory: []
    });

    return res.json({ shortUrl: shortId });
}

module.exports = { handleGenerateNewShortUrl };