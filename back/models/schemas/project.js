const { Schema } = require("mongoose");

const ProjectSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
  },
  content: {
    type: Schema.Types.ObjectId,
    ref: "Content",
  },
  image: {
    type: String,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  averageRating: {
    type: Number,
  },
});

module.exports = ProjectSchema;
