const {getUser} = require("../service/auth.js");


async function restrictToLoggedInUserOnly(req, res, next) {
    // const sessionId = req.cookies.sessionId;
    const sessionId = req.headers["authorization"]; 
    // req.headers will be in form 
    // {
    //     "authorization": "Bearer <token>"
    //      ...other headers
    // }

    //sessionId = "Bearer <token>" here
    if (!sessionId) { return res.redirect("/render/signin"); }

    const token = sessionId.split("Bearer ")[1];
    // we need only the token part
    // so .split it by "Bearer " and take the second part

    const user = getUser(token);
    if (!user) { return res.redirect("/render/signin"); }
    
    req.user = user;
    next();
}

async function logOutIfSignInCalledAgain(req, res, next) {
    // const sessionId = req.cookies.sessionId;
    const sessionId = req.headers["authorization"];
    if (!sessionId) return next();
    
    const token = sessionId.split("Bearer ")[1];

    const user = getUser(token);
    if (!user) return next();

    // res.clearCookie("sessionId");
    next();
}
module.exports = { restrictToLoggedInUserOnly, logOutIfSignInCalledAgain };