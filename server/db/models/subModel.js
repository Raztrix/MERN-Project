const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  MovieId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  MemberId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  Date: Date,
});

const Sub = mongoose.model("Sub", subSchema);

module.exports = {
  Sub,
};
