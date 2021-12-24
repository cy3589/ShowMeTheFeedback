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
    projectName: {
      type: String,
      required: true,
    },
    contents: {
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
    thumbnails: [String],
    comments: [
      {
        comment: {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      },
    ],
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
