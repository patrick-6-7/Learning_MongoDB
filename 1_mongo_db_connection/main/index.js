const express = require('express');                          //our flow of code
const {connectMongoose} = require("./connection.js");     // initlizing mongoose
const {logReqRes} = require("../middlewares/index.js");  //initlizing middlewares 
const usersRoute = require("../routes/users.js");           //initlizing routes 

const app = express();
const PORT = 8000;

//mongooose connection -> 
//(schema creation -> model creation) routes file will handle this
connectMongoose("mongodb://127.0.0.1:27017/DB_CONNECTION");

//middleware plugins
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));

//routes
app.use("/user", usersRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});