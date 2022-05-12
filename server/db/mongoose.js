// this file will handle the mongo db connection logic.
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/finalDB", {
    //userNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongoDB successfully");
  })
  .catch((error) => {
    console.log("Error while attemted to connect to mongo db");
    console.log(error);
  });

module.exports = {
  mongoose,
};
