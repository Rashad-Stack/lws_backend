const AppError = require("../utils/appError");

const dbCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  console.log(
    "🚀 ~ file: errorController.js:10 ~ handleDuplicateFieldsDB ~ value:",
    value
  );

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const devError = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statuscode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const prodError = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      // A) Operational, trusted error: send message to client
      return res.status(err.statuscode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    devError(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error?.name === "CastError") error = dbCastError(error);
    if (error?.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error?.errors?.options?.name === "ValidatorError")
      error = handleValidationErrorDB(error);
    if (error?.name === "ValidatorError")
      error = handleValidationErrorDB(error);
    if (error?.name === "JsonWebTokenError") error = handleJWTError();
    if (error?.name === "TokenExpiredError") error = handleJWTExpiredError();
    prodError(error, req, res);
  }
};
