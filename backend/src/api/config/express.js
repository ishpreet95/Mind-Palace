const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const routes = require("../routes/index");
const app = express();

const maxAge = 30 * 24 * 60 * 60 * 1000;
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Welcome to Mind Palace API");
});

app.get("/health-check", (req, res) => {
  res.sendStatus(200);
});
app.use("/api/v1", routes);

//exporting app to server.js
module.exports = app;
