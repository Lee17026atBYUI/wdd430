const mongoose = require('mongoose');

const speakerSchema = mongoose.Schema({
  // _id: {type: String},
  name: {type: String, required: true},
  lastSpoke: Date
});

module.exports = mongoose.model('Speaker', speakerSchema);