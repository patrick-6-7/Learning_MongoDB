const express = require("express");
const path = require("path");

const {connectMongoose} = require("./connection.js");
const urlRouter = require("./router/url.js");
const staticRouter = require("./router/static.js");

const app = express();
const PORT = 8000;


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests


app.use("/url", urlRouter);
app.use("/", staticRouter);


app.listen(PORT, () => {
    connectMongoose("mongodb://127.0.0.1:27017/rootShortner");
    console.log("server started ");
});
