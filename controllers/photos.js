const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users = require('../models/users');

// //////Index Route////// done
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

// //////New Route////// done
router.get('/new', (req, res) => {
	// Find all users so we can select them in the drop-down menu
	Users.find({}, (err, allUsers) => {
		res.render('photos/new.ejs', {
			users: allUsers
		});
	});
});

// //////Show Route////// done
// show the individual photo, list User name, show description
router.get('/:id', (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		console.log(foundPhoto, ' this is foundPhoto');
		// Find the user of the photo
		Users.findOne({'photos._id': req.params.id}, (err, foundUser) => {
			console.log(foundUser, ' this is foundUser');
			res.render('photos/show.ejs', {
				photo: foundPhoto,
				user: foundUser
			});
		});
	});
});

// //////Edit Route////// done
router.get('/:id/edit', (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		// Find all the users so we can select them in the drop down
		Users.find({}, (err, allUsers) => {
			// Now find the user the photo is by
			Users.findOne({'photos._id': req.params.id}, (err, foundPhotoUser) => {
				res.render('photos/edit.ejs', {
					photo: foundPhoto,
					users: allUsers,
					photoUser: foundPhotoUser
				});
			});
		});
	});
});

// //////Create Route////// done
router.post('/', (req, res) => {
	// Create a new photo, push a copy into the User's photos array
	Users.findById(req.body.userId, (err, foundUser) => {
		console.log(foundUser, ' this is foundUser at CREATE route');
		// foundUser is the document, with user's photos array
		Photos.create(req.body, (err, createdPhoto) => {
			console.log(err, ' this is error at CREATE route');
			console.log(createdPhoto, ' this is createdPhoto at CREATE route');
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

// //////Update Route//////
// Update a photo - also update the user's photos list
router.put('/:id', (req, res) => {
	Photos.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
		console.log(updatedPhoto, ' this is updatedPhoto at UPDATE route');
		// Find the user with that photo
		Users.findOne({'photos._id': req.params.id}, (err, foundUser) => {

			// Say there is a new user
			if (foundUser._id.toString() !== req.body.userId) {
				// Remove the article from the old author and then save it
				foundUser.photos.id(req.params.id).remove();
				foundUser.save((err, savedFoundUser) => {
					// Find the new user and add the photo to their array
					Users.findById(req.body.userId, (err, newUser) => {
						newUser.photos.push(updatedPhoto);
						newUser.save((err, savedFoundUser) => {
							res.redirect('/photos');
						});
					});
				});
			} else {
					// If the user is the same as it was previously
					// find the article and remove it, req.params.id = photos id
					foundUser.photos.id(req.params.id).remove();
					foundUser.photos.push(updatedPhoto);
					foundAuthor.save((err, data) => {
						res.redirect('/articles');
					});
			};
		});
	});
});

module.exports = router;