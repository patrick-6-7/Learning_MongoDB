const URL = require("../models/url.js");
const shortid = require('shortid');

async function PostNewShortUrlHandler(req, res) {
    const foundUrl =  await URL.findOne({ shortUrl: req.body.Url });

    if (foundUrl) {
        console.log(foundUrl);    
        return res.json({ 
            message: `short url already exists for ${req.body.Url}`,
            shortUrl: foundUrl.shortUrl
        });
    }

    const shortId = shortid.generate();

    await URL.create({ 
        shortUrl: shortId,
        originalUrl: req.body.Url,
        visitHistory: []
    });

    return res.json({ shortUrl: shortId });
}

async function RedirectToOriginalUrlHandler(req, res) {
    console.log('Starting redirect...', Date.now());
    
    const foundUrl = await URL.findOne({ shortUrl: req.params.Url });
    console.log('Database query completed:', Date.now());

    if (!foundUrl) {
        return res.status(404).json({ message: "URL not found" });
    }

    foundUrl.visitHistory.push({ timeStamp: Date.now() });
    await foundUrl.save();
    console.log('Visit history updated:', Date.now());

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