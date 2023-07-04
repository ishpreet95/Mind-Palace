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
app.use(cors());
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
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.json({ message: "home page" });
});
app.get("/login", (req, res) => {
  res.json({ message: "You are not logged in" });
});
app.get("/dashboard", (req, res) => {
  res.json({ message: "You are logged in" });
});

app.get("/auth/google", strat.authenticate("google", { scope: ["profile"] }));
let profile = "";
app.get(
  "/auth/google/callback",
  strat.authenticate("google", {
    // successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Save the profile data to the session
    // req.session.profile = req.user; // Assuming 'profile' is the property that holds the profile data
    // Redirect to the frontend route
    profile = req.user;
    res.redirect("http://localhost:5173/");
  }
);
app.get("/api/profile", (req, res) => {
  // const profile = req.session.profile; // Assuming you stored the profile data in the session
  res.send(profile);
});

app.listen(port, () => console.log("server running on port " + port));
