const express = require("express");
const {connectMongoose} = require("./connection.js");
const urlRoute = require("../router/url.js");
const PORT = 8001;

const app = express();

app.use(express.json()); //used to parse incoming json requests
app.use("/url", urlRoute);

app.listen(PORT, () => {
    connectMongoose("mongodb://127.0.0.1:27017/rootShortner");
    console.log(`Server is running on port ${PORT}`);
});