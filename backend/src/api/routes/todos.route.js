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

router.route("/todo").post(async (request, response) => {
  const newTodo = request.body.newTodo;
  const statusDoc = db
    .collection("users")
    .doc(`${request.user}`)
    .collection("todos")
    .doc(newTodo.id);
  // //putting auto generated id in newTodo
  // newTodo.id = statusDoc.id;
  // console.log(newTodo);
  const res = await statusDoc.set(newTodo);
  response.status(200).send("Todo added");
});

router.route("/todo").put(async (request, response) => {
  // console.log(request.body);
  const data = request.body.data;
  const statusDoc = db
    .collection("users")
    .doc(`${request.user}`)
    .collection("todos")
    .doc(data.id);

  try {
    const res = await statusDoc.update(data);
    response.status(200).send("Todo updated");
  } catch (error) {
    console.error("Error updating todo:", error);
    response.status(500).send("An error occurred while updating todo");
  }
});

router.route("/todo/:id").delete(async (request, response) => {
  const id = request.params.id;
  // console.log(id);
  const statusDoc = db
    .collection("users")
    .doc(`${request.user}`)
    .collection("todos")
    .doc(id);
  try {
    const res = await statusDoc.delete();
    response.status(200).send("Todo deleted");
  } catch (error) {
    console.error("Error deleting todo:", error);
    response.status(500).send("An error occurred while deleting todo");
  }
});

router.route("/health-check").get((req, res) => {
  res.sendStatus(200);
});

module.exports = router;
