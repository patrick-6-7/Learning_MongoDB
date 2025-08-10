const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//mongooose connection
mongoose.connect("mongodb://127.0.0.1:27017/DB_CONNECTION")
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("failed to connect DB"));

//middleware
app.use(express.urlencoded({extended: false}));

//let's create our scheema
const userScheema = new mongoose.Schema({
    last_name:  { type: String },
    first_name: { type: String, required: true },
    gender:     { type: String, required: true },
    job_title:  { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    id:         { type: Number, required: true, unique: true },
});

//now let's create model from our scheema
const users = mongoose.model("users", userScheema);

//routes
app.get("/", (req, res) =>{
    return res.end("welcome to our company");
});

app.get("/users", (req, res) =>{
    return res.json(users);
});

app.route("/user/:id")
.get(async (req, res) =>{
    try{
        const userId = parseInt(req.params.id);
        const userObject = await users.findOne({id: userId});
        if(userObject) return res.json(userObject);
        else return res.status(400).json({message: `no user found with id ${userId}`});
    }catch{
        return res.status(500).json({message: "Error fetching user"});
    }
})
.post(async (req, res) => {
    try {
        const newUserData = req.body;
        const userId = parseInt(req.params.id);

        const existingUser = await users.findOne({id: userId});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await users.create({
            id: userId,
            first_name: newUserData.first_name,
            last_name: newUserData.last_name,
            job_title: newUserData.job_title,
            gender: newUserData.gender,
            email: newUserData.email,
        });

        return res.status(201).json({message: `new user created ${user.first_name}`});

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({message: "Internal server error"});
    }
})
.delete(async (req, res)=>{
    try{
        const userId = parseInt(req.params.id);
        const userObject = await users.findOne({id: userId});
        
        if(!userObject) return res.status(400).json({message: `no user found with id ${userId}`});
        
        await users.deleteOne(userObject);
        return res.status(200).json({message: `${userObject.first_name} got deleted!`});
         
    }catch{
        return res.status(500).json({message: "Error fetching user"});
    }
})
.patch(async (req, res) =>{
    try{
        const userId = parseInt(req.params.id);
        const userObject = await users.findOne({id: userId});
        
        if(!userObject) return res.status(404).json({message: `no user found with id ${userId}`});
        const updatedData = req.body;
        await users.updateOne(
            {id: userId},
            {$set: updatedData},
        );
        return res.status(200).json({
            message: `${userObject.first_name} got updated!`,
            updatedUser: await users.findOne({id: userId}),
        });
         
    }catch{
        return res.status(500).json({message: "Error fetching user"});
    }
});




app.listen(PORT, ()=>{});