// const app = require("../config/express");
const db = require("../firebase/config");
require("dotenv").config();

const router = require("express").Router();

router.route("/todo").post(async (req) => {
  console.log(req.body);
  const newTodo = req.body.newTodo;
  const statusDoc = db
    .collection("users")
    .doc(`${req.user}`)
    .collection("todos")
    .doc();
  const res = await statusDoc.set(newTodo);
  console.log(res.id);
});

router.route("/health-check").get((req, res) => {
  res.sendStatus(200);
});

module.exports = router;
