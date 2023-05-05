const { default: mongoose } = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    require: [true, "Please provide assignment title!"],
  },
  videoId: {
    type: String,
    require: [true, "Please provide assignment related video id!"],
  },
  videoTitle: {
    type: String,
    require: [true, "Please provide assignment related video id!"],
  },
  totalMark: {
    type: Number,
    require: [true, "Please provide total mark of the assignment!"],
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
