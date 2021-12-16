const { Schema } = require("mongoose");
const projectId = require("./type/short-id");

const ProjectSchema = new Schema(
  {
    projectId,
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
    image: {
      type: String,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ProjectSchema;
