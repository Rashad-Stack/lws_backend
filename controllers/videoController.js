const Video = require("../models/videoModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.postVideo = catchAsync(async (req, res) => {
  const video = await Video.create({
    title: req.body.title,
    url: req.body.url,
    views: req.body.views,
    duration: req.body.duration,
    description: req.body.description,
  });

  res.status(200).json({
    status: "success",
    video,
  });
});

exports.getVideo = catchAsync(async (req, res, next) => {
  const videos = await Video.find();
  if (videos.length > 0) {
    const video = await Video.findById(req.params.id || videos[0]._id);
    if (!video) {
      return next(new AppError("No video found!", 404));
    }

    res.status(200).json({
      status: "success",
      video,
    });
  } else {
    return next(new AppError("No video found!", 404));
  }
});

exports.updateVideo = catchAsync(async (req, res, next) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!video) {
    return next(new AppError("No video found with this id!", 404));
  } else {
    res.status(200).json({
      status: "success",
      video,
    });
  }
});

exports.deleteVideo = catchAsync(async (req, res, next) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    return next(new AppError("No video found with this id!", 404));
  } else {
    res.status(200).json({
      status: "success",
      video: null,
    });
  }
});
