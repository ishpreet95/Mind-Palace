const db = require("../firebase/config");
require("dotenv").config();

const router = require("express").Router();

router.route("/").get(async (req, res) => {
  // console.log(req.user);
  const todosRef = db
    .collection("users")
    .doc(`${req.user}`)
    // .doc("110677755243261039315")
    .collection("todos");
  const snapshot = await todosRef.get();
  let allTodos = [];
  snapshot.forEach((doc) => {
    allTodos.push(doc.data());
  });
  // console.log(allTodos);
  res.status(200).send(allTodos);
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
