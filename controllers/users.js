const express = require('express');
const router = express.Router();
const Users = require('../models/users');

// //////Index Route//////
router.get('/', (req, res) => {
	Users.find({}, (err, foundUsers) => {
		if(err) {
			res.send(err);
		} else {
			res.render('users/index.ejs', {
				users: foundUsers
			});
		};
	});
});

// //////New Route//////
router.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

// //////Create Route//////
router.post('/', (req, res) => {
	Users.create(req.body, (err, createdUser) => {
		console.log(createdUser, ' this is the createdUser');
		res.redirect('/users');
	});
});

// //////Show Route//////
router.get('/:id', (req, res) => {
	Users.findById(req.params.id, (err, foundUser) => {
		res.render('users/show.ejs', {
			user: foundUser
		});
	});
});

// //////Edit Route//////
router.get('/:id/edit', (req, res) => {
	Users.findById(req.params.id, (err, foundUser) => {
		res.render('users/edit.ejs', {
			user: foundUser
		});
	});
});

// //////Update Route//////
router.put('/:id', (req, res) => {
	Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundUser) => {
		res.redirect('/users');
	});
});

// //////Destroy Route//////
router.delete('/:id', (req, res) => {
	Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		console.log(deletedUser, ' this is deletedUser');
		res.redirect('/users');
	});
});

module.exports = router;