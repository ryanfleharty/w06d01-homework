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
	res.render('photos/new.ejs');
});

// //////Create Route//////
router.post('/', (req, res) => {
	Photos.create(req.body, (err, createdPhoto) => {
		console.log(createdPhoto, ' this is the createdPhoto');
		res.redirect('/photos');
	});
});

// //////Show Route//////
router.get('/:id', (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		res.render('photos/show.ejs', {
			photo: foundPhoto
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

// //////Destroy Route//////
router.delete('/:id', (req, res) => {
	Photos.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
		console.log(deletedPhoto, ' this is deletedPhoto');
		res.redirect('/photos');
	});
});

module.exports = router;