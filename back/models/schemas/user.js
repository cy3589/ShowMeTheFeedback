const { Schema } = require("mongoose");

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  token: {
    type: String,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = UserSchema;
