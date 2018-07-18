const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  url: {type:String},
  title: String
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = {
  photoSchema,
  Photo
};
