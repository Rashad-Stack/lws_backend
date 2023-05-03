const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRoutes")
const videoRouter = require("./routes/videoRoutes")

// Start express app
const app = express();
app.use(bodyParser.json());


// Define routes 
app.use("/api/v1/users",userRouter)
app.use("/api/v1/videos",videoRouter)


module.exports = app;
