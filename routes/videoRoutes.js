const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();

router.post("/post", videoController.postVideo);

module.exports = router;
