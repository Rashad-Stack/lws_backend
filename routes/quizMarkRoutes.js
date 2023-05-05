const express = require("express");
const quizMarkController = require("../controllers/quizMarkController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/").post(quizMarkController.postQuizMark);

module.exports = router;
