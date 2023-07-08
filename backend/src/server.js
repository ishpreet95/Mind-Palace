const admin = require("firebase-admin");
const db = require("./db");
const express = require("express");
const strat = require("./google-oauth");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
const app = express();
const maxAge = 30 * 24 * 60 * 60 * 1000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret:
      "YxMDM5MzE1IiwiZW1haWwiOiJpc2hImF0X2hhc2giOiJzUDdZWF9hazNTZWJDQ3hKbENBa3hnIiwibmFtZSI6IklzaHByZWV0IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9",
    //save session if nothing is modified
    resave: true,
    //create session when something is stored
    saveUninitialized: true,
    cookie: {
      maxAge: maxAge,
      //make it true for requests from HTTPS
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//sets user in session
passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});
//dont know what it does
passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

//
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.set("view engine", "ejs");

app.get(
  "/auth/google",
  //here email parameter is necessary, passport can't identify unique user without email
  strat.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  strat.authenticate("google", {
    failureRedirect: "/auth/google",
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:5173/");
  }
);
//getting user from session
app.get("/auth/user", (req, res) => {
  console.log(req.session);
  if (req.user === undefined) {
    return res.status(403).send("user not logged in");
  } else {
    return res.send(req.user);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running on port " + port));
