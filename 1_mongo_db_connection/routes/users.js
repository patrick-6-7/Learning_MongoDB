const express = require("express");
const router = express.Router();
const {getAllUsersHandler, 
       getUserByIdHandler, 
       PostUserByIdHandler,
       DeleteUserByIdHandler,
       UpdateUserByIdHandler,
    } = require("../controllers/user.js");
const {users} = require("../models/users.js");

router.get("/", getAllUsersHandler);

router.route("/:id")
.get(getUserByIdHandler)
.post(PostUserByIdHandler)
.delete(DeleteUserByIdHandler)
.patch(UpdateUserByIdHandler);

module.exports = router;