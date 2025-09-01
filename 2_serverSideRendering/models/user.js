const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        shortUrl:    { type: String, required: true, unique: true, index: true },
        originalUrl: { type: String, required: true, unique: true },
        visitHistory: [{
            timeStamp: { type: Number }
        }]
    },
    { 
        timestamps: true 
        //automatically add two more feilds to my schema 
        //which are createdAt and updatedAt
    }
);

const userSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    password: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    urls:     [ urlSchema ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;