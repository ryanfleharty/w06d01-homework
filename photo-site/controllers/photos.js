const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');
const User = require('../models/users.js');

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// PHOTOS INDEX PAGE & ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.get('/', (req, res) => {
	Photo.find({}, (err, foundPhotos) => {
		User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
			res.render('photos/index.ejs', {
				photos: foundPhotos,
				user: foundUser,
				});
			});
		});
	});


// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// NEW PAGE & ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.get('/new', (req, res) => {
	User.find({}, (err, allUsers) => {
		res.render('photos/new.ejs', {
			users: allUsers
		});
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// SHOW PAGE & ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.get('/:id', (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
			res.render('photos/show.ejs', {
				photo: foundPhoto,
				user: foundUser
			});
		});
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// EDIT PAGE & ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.get('/:id/edit', (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		User.find({}, (err, allUsers) => {
			User.findOne({'photos._id': req.params.id}, (err, foundPhotoUser) => {
				res.render('photos/edit.ejs', { 
				photo: foundPhoto,
				users: allUsers,
				photoUser: foundPhotoUser
				});
			});
		});
	});
});


// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// POST (NEW) ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.post('/', (req, res) => {
	User.findById(req.body.userId, (err, foundUser) => {
		Photo.create(req.body, (err, createdPhoto) => {
			foundUser.photos.push(createdPhoto);
			foundUser.save((err, data) => {
				res.redirect('/photos');
			});
		});
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// DELETE ROUTE:
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.delete('/:id', (req, res) => {
	Photo.findByIdAndRemove(req.params.id, (err, foundPhoto) => {
		User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
			foundUser.photos.id(req.params.id).remove();
			foundUser.save((err,data) => {
				res.redirect('/photos');
			});
		});
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++
// PUT ROUTE (UPDATE PHOTO [EDIT]):
// ++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++

router.put('/:id', (req, res) => {
	Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
		User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
			if (foundUser._id.toString() !== req.body.userId) {
				foundUser.photos.id(req.params.id).remove();
				foundUser.save((err, savedFoundUser) => {
					User.findById(req.body.userId, (err, newUser) => {
						newUser.photos.push(updatedPhoto);
						newUser.save((err, savedFoundUser) => {
							res.redirect('/photos');
						});
					});
				});
			} else {
				foundUser.photos.id(req.params.id).remove();
				foundUser.photos.push(updatedPhoto);
				foundUser.save((err, data) => {
					res.redirect('/photos');
				});
			}
		});
	});
});


module.exports = router;