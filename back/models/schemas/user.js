const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  projects: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

module.exports = UserSchema;
