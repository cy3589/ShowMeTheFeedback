const { Schema } = require('mongoose');

const TempUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  authCode: {
    type: Number,
    required: true,
  },
});

module.exports = TempUserSchema;
