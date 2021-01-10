const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, required: true },
});

const watchListSchema = new mongoose.Schema({
  studentID: {}
})

module.exports = User = mongoose.model("user", userSchema);