const Video = require("../models/videoModel");

exports.postVideo = async (req, res) => {
  try {
    const video = await Video.create({
      title: req.body.title,
      url: req.body.url,
      views: req.body.views,
      duration: req.body.duration,
      description: req.body.description,
    });

    res.status(200).json({
      status: "success",
      video,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error,
    });
  }
};

exports.getVideo = async (req, res) => {
  console.log(req.params.id);
  try {
    const videos = await Video.find();
    if (videos.length > 0) {
      const video = await Video.findById(req.params.id || videos[0]._id);
      res.status(200).json({
        status: "success",
        video,
      });
    } else {
      res.status(404).json({
        status: "success",
        message: "no video found",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error,
    });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!video) {
      res.status(404).json({
        status: "success",
        message: "No video found with this id!",
      });
    } else {
      res.status(200).json({
        status: "success",
        video,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error,
    });
  }
};
