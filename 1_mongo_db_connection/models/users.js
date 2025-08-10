const mongoose = require("mongoose");
//mongoose schema
const userSchema = new mongoose.Schema({
    last_name:  { type: String },
    first_name: { type: String, required: true },
    gender:     { type: String, required: true },
    job_title:  { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    id:         { type: Number, required: true, unique: true },
});

//mongoose model
const users = mongoose.model("users", userSchema);

module.exports = {users};