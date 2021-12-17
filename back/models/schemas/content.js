const { Schema } = require('mongoose');

const ContentSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
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
