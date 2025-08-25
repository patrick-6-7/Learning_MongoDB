const URL = require("../models/url.js");
const shortid = require('shortid');

async function PostNewShortUrlHandler(req, res) {
    const foundUrl =  await URL.findOne({ originalUrl: req.body.Url });

    if (foundUrl) {
        console.log(foundUrl);    
        return res.redirect("/");
    }

    const shortId = shortid.generate();

    await URL.create({ 
        shortUrl: shortId,
        originalUrl: req.body.Url,
        visitHistory: []
    });

    return res.redirect("/");
}

async function RedirectToOriginalUrlHandler(req, res) {
    const foundUrl = await URL.findOne({ shortUrl: req.params.Url });

    if (!foundUrl) console.error("Unexpected: URL not found:", req.params.Url);

    foundUrl.visitHistory.push({ timeStamp: Date.now() });
    await foundUrl.save();

    return res.redirect(foundUrl.originalUrl);
}

async function getAllExistingShortUrlsHandler(req, res){
    const allUrl = await URL.find({});
    return res.json(allUrl);
}


module.exports = { 
    PostNewShortUrlHandler,
    RedirectToOriginalUrlHandler,
    getAllExistingShortUrlsHandler
 };