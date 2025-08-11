const { time } = require("console");
const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema(
    {
        shortUrl:    { type: String, required: true, unique: true },
        originalUrl: { type: String, required: true },
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

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;