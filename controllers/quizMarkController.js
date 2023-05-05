const QuizMark = require("../models/quizMarkModel");
const catchAsync = require("../utils/catchAsync");

exports.postQuizMark = catchAsync(async (req, res, next) => {
  const { _id, name } = req.user || {};

  const quizMark = await QuizMark.create({
    ...req.body,
    studentId: _id,
    studentName: name,
  });

  res.status(201).json({
    status: "success",
    quizMark,
  });
});
