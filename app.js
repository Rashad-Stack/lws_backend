const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRoutes");
const videoRouter = require("./routes/videoRoutes");

const errorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

// Start express app
const app = express();
app.use(bodyParser.json());

// Define routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

// Unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;
