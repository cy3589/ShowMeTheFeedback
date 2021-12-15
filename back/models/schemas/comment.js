const { Schema } = require("mongoose");

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = CommentSchema;
