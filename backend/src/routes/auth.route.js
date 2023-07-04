//validations
const express = require("express");
const controller = require("../controllers/auth.controller");
const router = express.Router();

router.route("/register").post(controller.signup);
router.route("logout");
