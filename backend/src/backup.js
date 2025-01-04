const express = require("express");
const strat = require("./api/passport/google-oauth");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./api/firebase/config");
require("dotenv").config();
const app = express();
const maxAge = 30 * 24 * 60 * 60 * 1000;
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
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
//getting user_id from session
app.get("/auth/user", (req, res) => {
  // console.log(req.session);
  if (req.user === undefined) {
    return res.status(403).send("user not logged in");
  } else {
    return res.send(req.user);
  }
});

app.get("/health-check", (req, res) => {
  res.sendStatus(200);
});

const port = process.env.PORT;
app.listen(port, () => console.log("server running on port " + port));
