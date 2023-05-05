const { default: mongoose } = require("mongoose");

const quizMarkSchema = new mongoose.Schema({
  studentId: {
    type: String,
    require: [true, "Please provide student id!"],
  },
  studentName: {
    type: String,
    require: [true, "Please provide student name!"],
  },
  videoId: {
    type: String,
    require: [true, "Please provide quiz related video id!"],
  },
  videoTitle: {
    type: String,
    require: [true, "Please provide assignment related video id!"],
  },
  totalQuiz: Number,
  totalCorrect: Number,
  totalWrong: Number,
  totalMark: {
    type: Number,
    require: [true, "Please provide a assignment mark!"],
  },
  mark: {
    type: Number,
    default: 0,
  },
  published: {
    type: Boolean,
    default: true,
  },
});

const QuizMark = mongoose.model("QuizMark", quizMarkSchema);

module.exports = QuizMark;
