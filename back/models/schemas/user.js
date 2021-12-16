const { Schema } = require('mongoose');

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
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  token: {
    type: String,
  },
});

module.exports = UserSchema;
