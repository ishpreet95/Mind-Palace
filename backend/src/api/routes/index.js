const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route.js");
const todosRoutes = require("./todos.route.js");

router.use("/auth", authRoutes);
router.use("/todos", todosRoutes);
module.exports = router;
