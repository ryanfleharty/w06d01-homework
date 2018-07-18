const express = require('express');
const router = express.Router();
const {User} = require('../models/users');

router.get('/', (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('users/index.ejs', {
        users: data
      })
    }
  })  
})

router.get('/new', (req, res) => {
  res.render('users/new.ejs');
})

router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    res.render('users/edit.ejs', {
    user: data
    })
  })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('users/show.ejs', {
      user: data
      })
    }
  })
})

router.post('/', (req, res) => {
  User.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/users');
    }
  })
})

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/users')
    }
  })
})

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/users');
    }
  })
})

module.exports = router;