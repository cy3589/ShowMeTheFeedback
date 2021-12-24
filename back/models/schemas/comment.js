const { Schema } = require("mongoose");
const commentId = require("./type/short-id");

const CommentSchema = new Schema(
  {
    commentId,
    projectId: {
      type: "String",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

CommentSchema.statics.getPaginatedComments = async function (
  query,
  page,
  perPage
) {
  const [total, comments] = await Promise.all([
    this.countDocuments(query),
    this.find(query)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage),
  ]);

  const totalPage = Math.ceil(total / perPage);

  return [comments, totalPage];
};

module.exports = CommentSchema;
