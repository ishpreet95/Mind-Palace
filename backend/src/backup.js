const express = require("express");
const session = require("express-session");
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

//
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.set("view engine", "ejs");

app.get(
  "/auth/google/callback",
  () => {},
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
