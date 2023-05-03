const { default: mongoose } = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a video title!"]
  },
  url: {
    type: String,
    required: [true, "Please provide video url!"]
  },
  views: {
    type: Number,
    required: [true, "Please provide video views!"]
  },
  duration: {
    type: String,
    required: [true, "Please provide video duration!"]
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
