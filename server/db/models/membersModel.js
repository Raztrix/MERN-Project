const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  City: String,
});

const Member = mongoose.model("Member", memberSchema);

module.exports = {
  Member,
};
