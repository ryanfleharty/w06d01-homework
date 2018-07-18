const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Photo = require('../models/photos.js');



// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// USERS INDEX PAGE & ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		res.render('users/index.ejs', {
			users: foundUsers
		});
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// NEW PAGE & ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// SHOW PAGE & ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/show.ejs', {
			user: foundUser
		});
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// EDIT PAGE & ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.get('/:id/edit', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/edit.ejs', { 
			user: foundUser
		});
	});
});

router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		res.redirect(`/users/${updatedUser.id}`);
	});
});


// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// POST (NEW):
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++


router.post('/', (req, res) => {
	User.create(req.body, (err, createdUser) => {
		res.redirect('/users');
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// DELETE ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		const photoIds = [];
		for (let i = 0; i < deletedUser.photos.length; i++) {
			photoIds.push(deletedUser.photos[i].id);
		}
		Photo.remove({
			_id: { $in: photoIds }
		}, (err, data) => {
			res.redirect('/users');
		});
	});
});




module.exports = router;