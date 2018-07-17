const express = require('express');
const router = express.Router();
const Users = require('../models/users');

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

router.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

router.post('/', (req, res) => {
	Users.create(req.body, (err, createdUser) => {
		console.log(createdUser, ' this is the createdUser');
		res.redirect('/users');
	});
});

router.get('/:id', (req, res) => {
	Users.findById(req.params.id, (err, foundUser) => {
		res.render('users/show.ejs', {
			user: foundUser
		});
	});
});

router.get('/:id/edit', (req, res) => {
	Users.findById(req.params.id, (err, foundUser) => {
		res.render('users/edit.ejs', {
			user: foundUser
		});
	});
});

router.put('/:id', (req, res) => {
	Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundUser) => {
		res.redirect('/users');
	});
});


router.delete('/:id', (req, res) => {
	Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		console.log(deletedUser, ' this is deletedUser');
		res.redirect('/users');
	});
});

module.exports = router;