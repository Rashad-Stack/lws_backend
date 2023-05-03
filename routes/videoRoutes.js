const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();

router.route("/").get(videoController.getVideo).post(videoController.postVideo);
router
  .route("/:id")
  .get(videoController.getVideo)
  .patch(videoController.updateVideo);

router;

module.exports = router;
