const { Schema } = require("mongoose");

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
  code: {
    type: Number,
    required: true,
  },
});

module.exports = TempUserSchema;
