const { Schema } = require('mongoose');

const ImageSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = ImageSchema;
