const USERS = require("../models/user.js")
const {getUser} = require("../service/auth.js");
const shortid = require('shortid');

async function PostNewShortUrlHandler(req, res) {
    const sessionId = req.cookies.sessionId;
    const userData = getUser(sessionId);

    const foundUser = await USERS.findOne({ email: userData.email });

    // check if url already exists for this user
    const exists = await foundUser.urls.find( (u) => u.originalUrl === req.body.Url );
    if (exists) return res.redirect("/render/info");
    
    const shortId = shortid.generate();

    foundUser.urls.push({ 
        shortUrl: shortId,
        originalUrl: req.body.Url,
        visitHistory: []
    });

    await foundUser.save(); //save this info in USER
    return res.redirect("/render/info");
}

async function RedirectToOriginalUrlHandler(req, res) {
    const sessionId = req.cookies.sessionId;
    const userData = getUser(sessionId);

    const foundUser = await USERS.findOne({ email: userData.email });
    const url = foundUser.urls.find(u => u.shortUrl === req.params.Url);
    
    if (!url) {
        console.error("Unexpected: URL not found:", req.params.Url);
        return res.redirect("/render/info");
    }

    url.visitHistory.push({ timeStamp: Date.now() });
    await foundUser.save();

    return res.redirect(`${url.originalUrl}`);
}


module.exports = { 
    PostNewShortUrlHandler,
    RedirectToOriginalUrlHandler,
 };