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
});
