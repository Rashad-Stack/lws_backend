const express = require("express");
const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(quizController.getQuizzes)
  .post(authController.restricted, quizController.addQuiz);

router
  .route("/:id")
  .patch(authController.restricted, quizController.updateQuiz)
  .delete(authController.restricted, quizController.deleteQuiz);

module.exports = router;
