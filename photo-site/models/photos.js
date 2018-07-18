const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	name: String,
	img: String,
});

module.exports = mongoose.model('Photos', photoSchema);