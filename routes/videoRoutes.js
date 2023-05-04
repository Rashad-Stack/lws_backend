const express = require("express");
const authController = require("../controllers/authController");
const videoController = require("../controllers/videoController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(videoController.getVideo)
  .post(authController.restricted, videoController.postVideo);
router
  .route("/:id")
  .get(videoController.getVideo)
  .patch(authController.restricted, videoController.updateVideo)
  .delete(authController.restricted, videoController.deleteVideo);

router;

module.exports = router;
