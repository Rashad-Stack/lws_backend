const Quiz = require("../models/quizModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.create({ ...req.body });

  res.status(201).json({
    status: "success",
    quiz,
  });
});

exports.getQuizzes = catchAsync(async (req, res, next) => {
  const query = req?.query?.videoId ? { videoId: req.query.videoId } : {};

  const quizzes = await Quiz.find(query);

  res.status(200).json({
    status: "success",
    quizzes,
  });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!quiz) {
    return next(new AppError("No Quiz found with this id!", 404));
  }

  res.status(200).json({
    status: "success",
    quiz,
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);

  if (!quiz) {
    return next(new AppError("No quiz found with this id!", 404));
  }

  res.status(204).json({
    status: "success",
  });
});
