const Quiz = require("../models/quizModel");
const catchAsync = require("../utils/catchAsync");
exports.addQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.create({
    question: req.body.question,
    videoId: req.body.videoId,
    videoTile: req.body.videoTile,
    options: [...req.body.options],
  });

  res.status(200).json({
    status: "success",
    quiz,
  });
});
