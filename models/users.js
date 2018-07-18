const mongoose = require('mongoose');
const Photos = require('./photos');

const usersSchema = mongoose.Schema({
  name: String,
  password: String,
  photos: [Photos.schema]
});

module.exports = mongoose.model('Users', usersSchema);











