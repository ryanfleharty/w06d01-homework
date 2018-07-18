const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users = require('../models/users');

// //////Index Route//////
router.get('/', (req, res) =>{
	Photos.find({}, (err, foundPhotos) => {
		if (err) {
			res.send(err);
		} else {
			res.render('photos/index.ejs', {
				photos: foundPhotos
			});
		};
	});
});;

// //////New Route//////
router.get('/new', (req, res) => {
	// Find all users so we can select them in the drop-down menu
	Users.find({}, (err, allUsers) => {
		res.render('photos/new.ejs', {
			users: allUsers
		});
	});
});

// //////Show Route//////
// show the individual photo, list User name, show description
router.get('/:id', (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		// Find the user of the photo
		Users.findOne({'photos._id': req.param.id}, (err, foundUser) => {
			res.render('photos/show.ejs', {
				photo: foundPhoto,
				user: foundUser
			});
		});
	});
});

// //////Edit Route//////
router.get('/:id/edit', (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		res.render('photos/edit.ejs', {
			photo:foundPhoto
		});
	});
});

// //////Update Route//////
router.put('/:id', (req, res) => {
	Photos.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
		res.redirect('/photos');
	});
});

// //////Create Route//////
router.post('/', (req, res) => {
	// Create a new photo, push a copy into the User's photos array
	Users.findById(req.body.user, (err, foundUser) => {
		// foundUser is the document, with user's photos array
		Photos.create(req.body, (err, createdPhoto) => {
			foundUser.photos.push(createdPhoto);
			foundUser.save((err, data) => {
				res.redirect('/photos');
			});
		});
	});
});

// //////Destroy Route//////
router.delete('/:id', (req, res) => {
	Photos.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
		console.log(deletedPhoto, ' this is deletedPhoto');
		res.redirect('/photos');
	});
});

module.exports = router;


