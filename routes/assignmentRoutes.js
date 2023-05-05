const express = require("express");

const authController = require("../controllers/authController");
const assignmentController = require("../controllers/assignmentController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(assignmentController.getAssignments)
  .post(authController.restricted, assignmentController.createAssignment);

router
  .route("/:id")
  .patch(authController.restricted, assignmentController.updateAssignment)
  .delete(authController.restricted, assignmentController.deleteAssignment);

module.exports = router;
