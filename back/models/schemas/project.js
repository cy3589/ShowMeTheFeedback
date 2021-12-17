const { Schema } = require('mongoose');
const projectId = require('./type/short-id');
const CommentSchema = require('./comment');
const ImageSchema = require('./image');

const ProjectSchema = new Schema(
  {
    projectId,
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: Schema.Types.ObjectId,
      ref: 'Content',
    },
    image: [ImageSchema],
    comments: [CommentSchema],
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
