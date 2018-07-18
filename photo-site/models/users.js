const mongoose = require('mongoose');
const Photo = require('./photos')

const userSchema = new mongoose.Schema({
	name: String,
	password: String,
	photos: [Photo.schema],
});

module.exports = mongoose.model('Users', userSchema);