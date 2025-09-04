const express = require("express");
const path = require("path");
const cookieparser = require("cookie-parser");

const {connectMongoose} = require("./connection.js");
const {restrictToLoggedInUserOnly} = require("./middlewares/auth.js");
const signUpRouter = require("./router/auth.js");
const urlRouter = require("./router/url.js");
const staticRouter = require("./router/static.js");

const app = express();
const PORT = 8000;


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
app.use(cookieparser()); // Middleware to parse cookies


app.use("/url", restrictToLoggedInUserOnly, urlRouter);
app.use("/auth", signUpRouter);
app.use("/render", staticRouter);


app.listen(PORT, () => {
    connectMongoose("mongodb://127.0.0.1:27017/rootShortner");
    console.log("server started ");
});
