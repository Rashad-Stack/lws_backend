const QuizMark = require("../models/quizMarkModel");
const AppError = require("../utils/appError");
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

exports.getQuizMark = catchAsync(async (req, res, next) => {
  const query = req?.query?.videoId
    ? { videoId: req.query.videoId, studentId: req.user._id }
    : {};
  const quizMark = await QuizMark.find(query);

  if (!quizMark) {
    return next(new AppError("No quiz found of related to this video!", 404));
  }

  res.status(200).json({
    status: "success",
    quizMark,
  });
});
