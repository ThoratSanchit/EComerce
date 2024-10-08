const db = require("../db/d");
const mongoose = require("mongoose");

// Define a User schema and model
const userSchema = new db.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userID: { type: Number, required: true }
});


const User = mongoose.model("User", userSchema);

module.exports = User;
