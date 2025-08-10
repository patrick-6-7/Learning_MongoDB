const fs = require("fs");

function logReqRes(fileName){
    return (req, res, next) =>{
        fs.appendFile(
            fileName,
            `Date: ${Date.now()} Request: ${req.method} ${req.url}\n`,
            (err, data) => {
                if (err) console.error("Error writing to log file:", err);
                next();
            }
        );
    }
}

module.exports = {logReqRes};