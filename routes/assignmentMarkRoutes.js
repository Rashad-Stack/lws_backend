const express = require("express");

const assignmentMarkController = require("../controllers/assignmentMarkController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(assignmentMarkController.getAssignmentMarks)
  .post(assignmentMarkController.createAssignmentMark);

router
  .route("/:id")
  .patch(
    authController.restricted,
    assignmentMarkController.updateAssignmentMark
  );

module.exports = router;
