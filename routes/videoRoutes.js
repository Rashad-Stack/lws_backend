const express = require("express");
const authController = require("../controllers/authController");
const videoController = require("../controllers/videoController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(videoController.getVideo).post(videoController.postVideo);
router
  .route("/:id")
  .get(videoController.getVideo)
  .patch(videoController.updateVideo)
  .delete(videoController.deleteVideo);

router;

module.exports = router;
