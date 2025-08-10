const mongoose = require("mongoose");

async function connectMongoose(link){
    return await mongoose
    .connect(link)
    .then(() =>{
        console.log("Starting server...");
    })
    .catch((err) => console.log("failed to connect DB"));
}

module.exports = {connectMongoose};