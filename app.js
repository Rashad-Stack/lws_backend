const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const quizRoutes = require("./routes/quizRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const assignmentMarkRoutes = require("./routes/assignmentMarkRoutes");

const errorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

// Start express app
const app = express();
app.use(bodyParser.json());

// Define routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/assignmentsMark", assignmentMarkRoutes);

// Unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;
