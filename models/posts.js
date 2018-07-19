const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
	title: {type: String, required: true},
	url: String,
});

module.exports = mongoose.model("post", postSchema);
