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
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: maxAge },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    // console.log(user);
    return done(null, user);
  });
});

const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.set("view engine", "ejs");

app.get("/auth/google", strat.authenticate("google", { scope: ["profile"] }));
// let profile = "";
app.get(
  "/auth/google/callback",
  strat.authenticate("google", {
    // successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);
app.get("/auth/user", (req, res) => {
  console.log(req.session);
  console.log(req.user);
  res.send(req.user);
});

app.listen(port, () => console.log("server running on port " + port));
