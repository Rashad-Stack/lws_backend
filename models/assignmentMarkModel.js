const { default: mongoose } = require("mongoose");

const assignmentMarkSchema = new mongoose.Schema({
  studentId: {
    type: String,
    require: [true, "Please provide student id!"],
  },
  studentName: {
    type: String,
    require: [true, "Please provide student name!"],
  },
  assignmentId: {
    type: String,
    require: [true, "Please provide video related assignment id!"],
  },
  title: {
    type: String,
    unique: true,
    require: [true, "Please provide a assignment title!"],
  },
  totalMark: {
    type: Number,
    require: [true, "Please provide a assignment mark!"],
  },
  mark: Number,
  repoLink: {
    type: String,
    require: [true, "Please provide assignment repository link!"],
  },

  status: {
    type: String,
    enum: ["Attend to assignment", "pending", "published"],
    default: "Attend to assignment",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const AssignmentMark = mongoose.model("AssignmentsMark", assignmentMarkSchema);
module.exports = AssignmentMark;
