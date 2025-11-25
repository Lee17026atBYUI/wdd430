const mongoose = require('mongoose');

let childSchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String},
  url: {type: String}
});

const documentSchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String},
  url: {type: String},
  // children: [mongoose.Schema.Types.Mixed]
  children: [childSchema]
});

// childSchema = new mongoose.Schema({
//   id: {type: String, required: true},
//   name: {type: String, required: true},
//   url: {type: String}
// });


module.exports = mongoose.model('Document', documentSchema);