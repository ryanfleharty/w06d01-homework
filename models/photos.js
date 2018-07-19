const mongoose = require('mongoose');

const photosSchema = mongoose.Schema({
  title: String,
  url: String
});

const Photos = mongoose.model('Photos', photosSchema);

module.exports = Photos;