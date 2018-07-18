const mongoose = require('mongoose');
const Photo = require('./photos');

const userSchema = mongoose.Schema({
	username: {type: String},
	password: {type: String, required: true},
	photos: [Photo.schema],
});

module.exports = mongoose.model('User', userSchema);