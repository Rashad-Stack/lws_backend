const AssignmentMark = require("../models/assignmentMarkModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createAssignmentMark = catchAsync(async (req, res, next) => {
  const { _id, name } = req.user || {};
  const assignmentMark = await AssignmentMark.create({
    ...req.body,
    studentId: _id,
    studentName: name,
  });

  res.status(201).json({
    status: "success",
    assignmentMark,
  });
});

exports.getAssignmentMarks = catchAsync(async (req, res, next) => {
  // const query = req?.query?.videoId ? { videoId: req.query.videoId,studentId:req.query.studentId } : {};

  const assignmentMark = await AssignmentMark.find();
  res.status(200).json({
    status: "success",
    assignmentMark,
  });
});

exports.updateAssignmentMark = catchAsync(async (req, res, next) => {
  const assignmentMark = await AssignmentMark.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!assignmentMark) {
    return next(new AppError("No assignment found with this id!", 404));
  }

  res.status(200).json({
    status: "success",
    assignmentMark,
  });
});
