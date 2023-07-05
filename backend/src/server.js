const admin = require("firebase-admin");
const db = require("./db");
const express = require("express");
const strat = require("./google-oauth");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
const app = express();
const maxAge = 30 * 24 * 60 * 60 * 1000;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: maxAge },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const port = process.env.PORT || 5000;
// app.use(express.static("public"));
// app.set("view engine", "ejs");

// Redirect to Google sign-in
app.get("/auth", (req, res) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    // User is already authenticated, return the user data
    return res.status(200).json({ user: req.session.passport.user });
  } else {
    // Redirect to the Google sign-in
    res.redirect("/auth/google");
  }
});

// Google sign-in route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// Google sign-in callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
  }),
  (req, res) => {
    // Successful authentication, redirect to /auth
    res.redirect("/auth");
  }
);

app.listen(port, () => console.log("server running on port " + port));
