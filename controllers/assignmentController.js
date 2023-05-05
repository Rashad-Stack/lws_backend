const Assignment = require("../models/assignmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createAssignment = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.create({ ...req.body });

  res.status(201).json({
    status: "success",
    assignment,
  });
});

exports.getAssignments = catchAsync(async (req, res) => {
  const query = req?.query?.videoId ? { videoId: req.query.videoId } : {};

  const assignments = await Assignment.find(query);

  res.status(200).json({
    status: "success",
    assignments,
  });
});

exports.updateAssignment = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!assignment) {
    return next(new AppError("No assignment found with this id!", 404));
  }

  res.status(200).json({
    status: "success",
    assignment,
  });
});

exports.deleteAssignment = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);
  if (!assignment) {
    return next(new AppError("No assignment found with this id!", 404));
  }

  res.status(204).json({
    status: "success",
  });
});
