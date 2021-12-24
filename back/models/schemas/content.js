const { Schema } = require("mongoose");

const ContentSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
  },
  mainFunc: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
});

module.exports = ContentSchema;
