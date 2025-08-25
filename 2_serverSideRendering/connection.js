const mongoose = require("mongoose");

function connectMongoose(path){
    mongoose.connect(path)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err));
}

module.exports = {
    connectMongoose,
    
}