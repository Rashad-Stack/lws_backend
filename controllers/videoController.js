const Video = require("../models/videoModel");

 exports.postVideo = async (req, res) => {
  try {
    const video = await Video.create({
      title: req.body.title,
      url: req.body.url,
      views: req.body.views,
      duration: req.body.duration,
      description: req.body.description
    });

    res.status(200).json({
      status: "success",
      video
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error
    });
  }
};
