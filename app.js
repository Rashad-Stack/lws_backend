const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRoutes")

// Start express app
const app = express();
app.use(bodyParser.json());


// Define routes 
app.use("/api/v1/users",userRouter)


module.exports = app;
