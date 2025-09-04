const {getUser} = require("../service/auth.js");


async function restrictToLoggedInUserOnly(req, res, next) {
    const sessionId = req.headers["authorization"];
    if (!sessionId) { return res.redirect("/render/signin"); }
    
    const user = getUser(sessionId);
    if (!user) { return res.redirect("/render/signin"); }
    
    req.user = user;
    next();
}

async function logOutIfSignInCalledAgain(req, res, next) {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) return next();

    const user = getUser(sessionId);
    if (!user) return next();

    res.clearCookie("sessionId");
    next();
}
module.exports = { restrictToLoggedInUserOnly, logOutIfSignInCalledAgain };