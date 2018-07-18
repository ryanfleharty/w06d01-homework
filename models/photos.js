const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
	user: {type: String},
	img: {type: String, required: true},
	about: {type: String},
});

module.exports = mongoose.model('Photo', photoSchema);