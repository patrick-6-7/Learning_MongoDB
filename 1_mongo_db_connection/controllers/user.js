const { users } = require("../models/users.js");

async function getAllUsersHandler(req, res){
    try {
        const allUsers = await users.find({}); 
        return res.json(allUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({message: "Error fetching users"});
    }
}

async function getUserByIdHandler(req, res){
    try{
        const userId = parseInt(req.params.id);
        const userObject = await users.findOne({id: userId});
        if(userObject) return res.json(userObject);
        else return res.status(400).json({message: `no user found with id ${userId}`});
    }catch{
        return res.status(500).json({message: "Error fetching user"});
    }
}

async function PostUserByIdHandler(req, res){
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
}

async function DeleteUserByIdHandler(req, res){
    try{
        const userId = parseInt(req.params.id);
        const userObject = await users.findOne({id: userId});
        
        if(!userObject) return res.status(400).json({message: `no user found with id ${userId}`});

        await users.deleteOne({id: userId});
        return res.status(200).json({message: `${userObject.first_name} got deleted!`});
         
    }catch{
        return res.status(500).json({message: "Error fetching user"});
    }
}

async function UpdateUserByIdHandler(req, res){
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
}

module.exports = {
    getAllUsersHandler,
    getUserByIdHandler,
    PostUserByIdHandler,
    DeleteUserByIdHandler,
    UpdateUserByIdHandler
};