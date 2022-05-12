const express = require("express");
const cors = require("cors");
const { mongoose } = require("./db/mongoose");
// load in the models
const { User } = require("./db/models/userModel");
const { Movie } = require("./db/models/movieModel");
const { Member } = require("./db/models/membersModel");
const { Sub } = require("./db/models/subModel");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* ROUTE HANDLERS */
/*--------------- USER ROUTES ---------------------- */
app.post("/register", (req, res) => {
  // register user return the creds.
  // dont let duplicate user names
  let FullName = req.body.FullName;
  let UserName = req.body.UserName;
  let Password = req.body.Password;

  User.findOne({ UserName: req.body.UserName }).then((user) => {
    console.log(user);
    if (user == null) {
      let newUser = new User({
        FullName,
        UserName,
        Password,
      });
      newUser.save().then((userDocs) => {
        res.send(userDocs);
      });
    } else {
      res.sendStatus(400);
    }
  });
});

app.post("/login", (req, res) => {
  // login user verify his creds and returns jwt.
  User.findOne({
    UserName: req.body.UserName,
    Password: req.body.Password,
  }).then((user) => {
    console.log(user);
    if (user == null) {
      res.sendStatus(403);
    } else {
      token = "mytopsecrettoken";
      res.setHeader("RazToken", token);
      res.sendStatus(200);
    }
  });
});

/*---------------- MOVIES ROUTES --------------- */

// get all movies
app.get("/getMovies", (req, res) => {
  // here i want to return all the movies data from the database.
  Movie.find({}).then((movies) => {
    res.send(movies);
  });
});

// get movies by name
app.get("/findMovie/:query", (req, res) => {
  // find by query with case insensitivity.
  Movie.find({ Name: { $regex: `${req.params.query}`, $options: "i" } }).then(
    (movies) => {
      res.send(movies);
    }
  );
});

// create a movie
app.post("/addMovie", (req, res) => {
  // here i want to add movie to the db and return the created movie.
  let Name = req.body.Name;
  let YearPremiered = req.body.YearPremiered;
  let Genres = req.body.Genres;
  let ImgUrl = req.body.ImgUrl;
  let newMovie = new Movie({
    Name,
    YearPremiered,
    Genres,
    ImgUrl,
  });
  newMovie.save().then((movieDoc) => {
    res.send(movieDoc);
  });
});

// update a movie
app.patch("/editMovie/:id", (req, res) => {
  // here i want to update a movie and return ok
  Movie.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

// delete movie
app.delete("/deleteMovie/:id", (req, res) => {
  // here i want to delte a movie and return the new movie list.
  Movie.findOneAndDelete({ _id: req.params.id }).then((removedMovieDoc) => {
    res.send(removedMovieDoc);
  });
});

/*---------- MEMBERS ROUTES ------------- */

app.get("/getAllMembers", (req, res) => {
  // get a list of all the members.
  Member.find({}).then((members) => {
    res.send(members);
  });
});

app.post("/addMember", (req, res) => {
  // add member return the the added member.
  let Name = req.body.Name;
  let Email = req.body.Email;
  let City = req.body.City;
  let newMember = new Member({
    Name,
    Email,
    City,
  });
  newMember.save().then((memberDoc) => {
    res.send(memberDoc);
  });
});

app.patch("/editMember/:id", (req, res) => {
  // edit member returns ok.
  Member.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/deleteMember/:id", (req, res) => {
  // here i want to return the removed member
  Member.findOneAndDelete({ _id: req.params.id }).then((removedMember) => {
    res.send(removedMember);
  });
});

/*------------------ SUBSCRIPTION ROUTES ---------------------- */
app.post("/subToMovie/:memberid/:movieid", (req, res) => {
  // want to sub to movie basically it is to add info to sub model and returns the added model.
  let MovieId = req.params.movieid;
  let MemberId = req.params.memberid;
  let Date = req.body.Date;

  let newSub = new Sub({
    MovieId,
    MemberId,
    Date,
  });

  newSub.save().then((subDoc) => {
    res.send(subDoc);
  });
});

app.get("/getAllSubs", (req, res) => {
  // get all the subs from db.
  Sub.find({}).then((subs) => {
    res.send(subs);
  });
});

/*-------------END OF ROUTES----------------*/
app.listen(3000, () => console.log("Server is listening on port 3000"));
