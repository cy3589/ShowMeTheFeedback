const { Schema } = require("mongoose");

const ContentSchema = new Schema({
  members: {
    type: Array,
  },
  description: {
    type: String,
    required: true,
  },
  stack: {
    type: Array,
    required: true,
  },
});

module.exports = ContentSchema;
