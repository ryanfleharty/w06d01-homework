const mongoose = require("mongoose");
const Post = require("./posts");
const userSchema = mongoose.Schema({
	name: {type: String, required: true},
	biography: String,
	password: {type: String, required: true},
	posts: [Post.schema],
});

module.exports = mongoose.model("User", userSchema);