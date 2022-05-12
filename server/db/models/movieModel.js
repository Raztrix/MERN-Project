const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  Name: String,
  YearPremiered: Number,
  Genres: Array,
  ImgUrl: String,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Movie,
};
