const db = require("../firebase/config");
require("dotenv").config();

const router = require("express").Router();

router.route("/").get(async (req, res) => {
  const todosRef = db
    .collection("users")
    .doc(`110677755243261039315`)
    .collection("todos");
  const snapshot = await todosRef.get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
  res.status(200).send(snapshot);
});

router.route("/todo").post(async (req) => {
  const newTodo = req.body.newTodo;
  const statusDoc = db
    .collection("users")
    .doc(`${req.user}`)
    .collection("todos")
    .doc();
  //putting auto generated id in newTodo
  newTodo.id = statusDoc.id;
  console.log(newTodo);
  const res = await statusDoc.set(newTodo);
  console.log(res.id);
});

router.route("/health-check").get((req, res) => {
  res.sendStatus(200);
});

module.exports = router;
