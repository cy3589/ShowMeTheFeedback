const { Schema } = require('mongoose');

const ContentSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
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
