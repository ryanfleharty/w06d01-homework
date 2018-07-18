const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Post = require("../models/posts");
router.get("/", (req, res) => {
	User.find({}, (err, allUsers) => {
		if(err) {
			res.send(err)
		} else {
			res.render("users/index.ejs", {users: allUsers});
		}
	})
});
router.get("/new", (req, res) => {
	User.find({}, (err, foundUser) => {
		res.render("users/new.ejs", {users: foundUser});
	})
});
router.get("/:id", (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if (err) {
			console.log(err);
		} else {
			res.render("users/show.ejs", {user: foundUser});
		}
	})
});
router.get("/:id/edit", (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if (err) {
			console.log(err)
		} else {
			res.render("users/edit.ejs", {user: foundUser})
		}

	})
});
router.put("/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
			if(err) {
				res.send(err)
			} else {
				res.redirect("/users");
		}
});

	})
router.post("/", (req, res) => {
	console.log(req.body);
	User.create(req.body, (err, createdUser) => {
		if(err) {
			console.log(err)
		} else {
			res.redirect("/users");
		}
	})
});
router.delete("/:id", (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/users")
		}
	})
});







module.exports = router