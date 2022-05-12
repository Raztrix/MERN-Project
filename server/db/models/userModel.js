const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FullName: String,
  UserName: String,
  Password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
