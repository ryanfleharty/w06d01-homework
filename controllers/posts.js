const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const User = require("../models/users");
router.get("/", (req, res) => {
	Post.find({}, (err, allPosts) => {
		if(err) {
			res.send(err)
		} else {
			res.render("posts/index.ejs", {posts: allPosts});
		}
	})
});
router.get("/new", (req, res) => {
	User.find({}, (err, allUsers) => {
		if (err) {
			res.send(err)
		} else {
			res.render("posts/new.ejs", {users: allUsers
			});
		}
	});
});
router.get("/:id", (req, res) => {
	Post.findById(req.params.id, (err, foundPost) => {
		User.findOne({"posts._id": req.params.id}, (err, foundUser) => {
		if (err) {
			res.send(err);
		} else {
			res.render("posts/show.ejs", {post: foundPost, user: foundUser});
			}
		});
	});
});
router.get("/:id/edit", (req, res) => {
	Post.findById(req.params.id, (err, foundPost) => {
		if (err) {
			res.send(err);
		} else {
			User.find({}, (err, allUsers) => {
				if (err) {
					res.send(err);
				} else {
					User.findOne({"posts._id": req.params.id}, (err, foundPostUser) => {
						if (err) {
							res.send(err)
						} else {
							res.render("users/edit.ejs", {post: foundPost, users: allUsers, postUser: foundPostUser
							});
						}
					});	
				}
			});
		}
	});
});
router.put("/:id", (req, res) => {
	Post.findByIdAndUpdate(req.params.id, req.body, {
	new: true}, (err, updatedPost) => {
		User.findOne({"posts._id": req.params.id}, (err, foundUser) => {
			if(foundUser._id.toString() !== req.body.userId) {
				foundUser.posts.id(req.params.id).remove();
				foundUser.save((err, savedFoundUser) => {
					User.findById(req.body.userId, (err, newUser) => {
						newUser.posts.push(updatedPost);
						newUser.save((err, savedFoundUser) => {
							res.redirect("/posts");
						});
					});
				});
			} else {
				foundUser.posts.id(req.params.id).remove();
				foundUser.posts.push(updatedPost);
				foundUser.save((err, data) => {
					res.redirect("/posts");
				});
			};
		});
	});
});
router.post("/", (req, res) => {
	Post.create(req.body, (err, createdPost) => {
		User.findById(req.body.userId, (err, foundUser) => {
			if (err) {
				res.send(err);
			} else {
				Post.create(req.body, (err,createdPost) => {
					foundUser.posts.push(createdPost);
					foundUser.save((err, data) => {
						if (err) {
							res.send(err)
						} else {
							res.redirect("/posts");
						}
					});
				});
			}
		});
	});
});
router.delete("/:id", (req, res) => {
	Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
		if (err) {
			res.send(err);
		} else {
			User.findOne({"posts._id": req.params.id}, (err, foundUser) => {
				if (err) {
					res.send(err)
				} else {
					foundUser.posts.id(req.params.id).remove();
					foundUser.save((err, data) => {
						if (err) {
							res.send(err);
						} else {
							res.redirect("/users");
						}
					});
				}
			});
		}
	})
});


module.exports = router;