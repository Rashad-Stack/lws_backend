const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    require: [true, "Please provide option of this question!"],
  },
  isCorrect: {
    type: Boolean,
    require: [true, "Please provide this option is correct or not!"],
  },
});

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: true,
    require: [true, "Please provide a question!"],
  },
  videoId: {
    type: String,
    require: [true, "Please provide question related video id!"],
  },
  videoTitle: {
    type: String,
    require: [true, "Please provide question related video title!"],
  },
  options: {
    type: [optionSchema],
    require: [true, "Please provide option of this question!"],
    validate: {
      validator: function (options) {
        const correctOptions = options.filter((option) => option.isCorrect);
        return correctOptions.length > 0;
      },
      message: "At least one option must be marked as correct.",
    },
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
