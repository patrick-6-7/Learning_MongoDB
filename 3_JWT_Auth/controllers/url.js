const USERS = require("../models/user.js")
const {getUser} = require("../service/auth.js");
const shortid = require('shortid');

async function PostNewShortUrlHandler(req, res) {
    const user = await USERS.findOne({ email: req.user.email });

    // check if url already exists for this user
    const exists = await user.urls.find( (u) => u.originalUrl === req.body.Url );
    if (exists) return res.redirect("/render/info");
    
    const shortId = shortid.generate();

    user.urls.push({ 
        shortUrl: shortId,
        originalUrl: req.body.Url,
        visitHistory: []
    });

    await user.save(); //save this info in USER
    return res.redirect("/render/info");
}

async function RedirectToOriginalUrlHandler(req, res) {
    const user = await USERS.findOne({ email: req.user.email });
    const url = user.urls.find(u => u.shortUrl === req.params.Url);

    if (!url) {
        console.error("Unexpected: URL not found:", req.params.Url);
        return res.redirect("/render/info");
    }

    url.visitHistory.push({ timeStamp: Date.now() });
    await user.save();

    return res.redirect(`${url.originalUrl}`);
}

async function DeleteShortUrlHandler(req, res) {
    const user = await USERS.findOne({ email: req.user.email });
    const urlIndex = user.urls.findIndex(u => u.shortUrl === req.params.Url);

    if (urlIndex === -1) {
        console.error("Unexpected: URL not found:", req.params.Url);
        return res.redirect("/render/info");
    }

    user.urls.splice(urlIndex, 1);
    await user.save();

    return res.redirect("/render/info");
}

module.exports = { 
    PostNewShortUrlHandler,
    RedirectToOriginalUrlHandler,
    DeleteShortUrlHandler
 };