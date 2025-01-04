// const app = require("../config/express");

const strat = require("../passport/google-oauth");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../firebase/config");
require("dotenv").config();

const router = require("express").Router();

//sets user in session
passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    //setting user.sub as user_id in session
    const decodedToken = jwt.decode(user.id_token);
    const user_id = decodedToken.sub;
    return done(null, user_id);
  });
});

//dont know what it does
passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

//where the frontend calls for google authentication
router.route("/google").get(
  //here email parameter is necessary, passport can't identify unique user without email
  strat.authenticate("google", { scope: ["profile", "email"] })
);

//getting user_id from session
router.route("/user").get((req, res) => {
  // console.log(req.session);
  if (req.user === undefined) {
    return res.status(401).send("user not logged in");
    // res.redirect(`${process.env.CLIENT_URL}/sign-up`);
  } else {
    return res.send(req.user);
  }
});

//result of google authentication and storing in db
router.route("/google/callback").get(
  strat.authenticate("google", {
    failureRedirect: "/auth/google",
  }),
  async (req, res) => {
    //On successful authentication
    const decodedToken = jwt.decode(req.user.id_token);
    const user = {
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      created_at: decodedToken.iat,
      email_verified: decodedToken.email_verified,
    };
    const userDoc = db.collection("users").doc(decodedToken.sub);
    const doc = await userDoc.get();
    if (!doc.exists) {
      console.log("User does not exist, new profile created");
      await userDoc.set(user);
    } else {
      // console.log("User exists: ", doc.data());
    }
    // Redirects home.
    res.redirect(`${process.env.CLIENT_URL}`);
  }
);

router.route("/health-check").get((req, res) => {
  res.sendStatus(200);
});

module.exports = router;
