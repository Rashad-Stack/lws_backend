const express = require("express");
const quizController = require("../controllers/quizController");

const router = express.Router();

router.route("/").get().post(quizController.addQuiz);

module.exports = router;
