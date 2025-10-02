const admin = require("firebase-admin");
const db = require("../firebase/config");
require("dotenv").config();

const router = require("express").Router();

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken.uid; // Set user to Firebase UID
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// Apply middleware to all routes
router.use(verifyFirebaseToken);

router.route("/").get(async (req, res) => {
  const todosRef = db
    .collection("users")
    .doc(req.user)
    .collection("todos");
  const snapshot = await todosRef.get();
  let allTodos = [];
  snapshot.forEach((doc) => {
    allTodos.push(doc.data());
  });
  res.status(200).send(allTodos);
});

router.route("/todo").post(async (request, response) => {
  const newTodo = request.body.newTodo;
  const statusDoc = db
    .collection("users")
    .doc(request.user)
    .collection("todos")
    .doc(newTodo.id);
  const res = await statusDoc.set(newTodo);
  response.status(200).send("Todo added");
});

router.route("/todo").put(async (request, response) => {
  const data = request.body.data;
  const statusDoc = db
    .collection("users")
    .doc(request.user)
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
  const statusDoc = db
    .collection("users")
    .doc(request.user)
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
