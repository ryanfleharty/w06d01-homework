const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');

router.get('/', (req, res) => {
  Photo.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('photos/index.ejs', {
        photos:data
      });
    }
  })
});

router.get('/new', (req, res) => {
  res.render('photos/new.ejs');
})

router.get('/:id/edit', (req, res) => {
  Photo.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('photos/edit.ejs', {
        photo:data
      });
    }
  })
})

router.get('/:id', (req, res) => {  
  Photo.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('photos/show.ejs', {
      photo:data
      })
    }
  })
})

router.post('/', (req, res) => {
  Photo.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/photos')
    }
  })
})

router.put('/:id', (req, res) => {  
  Photo.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/photos');
    }
  })
})

router.delete('/:id', (req, res) => {
  Photo.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/photos');
    }
  })
})

module.exports = router;