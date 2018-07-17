const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
	user: {type: String, required: true},
	img: {type: String, required: true},
	about: {type: String},
});

module.exports = mongoose.model('Photo', photoSchema);