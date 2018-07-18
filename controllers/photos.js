const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users  = require('../models/users');

router.get('/', (req, res)=>{
  Photos.find({}, (err, foundPhotos)=>{
    res.render('photos/index.ejs', {
      photos: foundPhotos
    });
  })
});

router.get('/new', (req, res)=>{
  Users.find({}, (err, allUsers) => {
    res.render('photos/new.ejs', {
      users: allUsers
    });
  });
});


router.get('/:id', (req, res)=>{
  Photos.findById(req.params.id, (err, foundPhotos)=>{
    Users.findOne({'photos._id': req.params.id}, (err, foundUsers) =>{

       res.render('photos/show.ejs', {
          photos: foundPhotos,
          users: foundUsers
      });
    });
  });
});

router.get('/:id/edit', (req, res) => {

  Photos.findById(req.params.id, (err, foundPhotos) => {

    Users.find({}, (err, allUsers) => {

      Users.findOne({'photos._id': req.params.id}, (err, foundArticleUsers) => {

            res.render('photos/edit.ejs', {
              photos: foundPhotos,
              users: allUsers,
              photosUser: foundPhotosUser
        });
      });
    });
  });
});


router.post('/', (req, res)=>{
  Users.findById(req.body.usersId, (err, foundUser) => {

    Photos.create(req.body, (err, createdPhotos)=>{
      foundUser.photos.push(createdPhotos);
      foundUser.save((err, data) => {
        res.redirect('/photos');
      });
    });
  });
});


router.delete('/:id', (req, res)=>{
  Photos.findByIdAndRemove(req.params.id, (err, foundPhotos)=>{
    Users.findOne({'photos._id': req.params.id}, (err, foundUser) => {

      foundUser.photos.id(req.params.id).remove();
      foundUser.save((err, data) => {
        res.redirect('/photos');
      });
    });
  });
});

router.put('/:id', (req, res)=>{
  Photos.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedPhotos)=>{

    User.findOne({'photos._id': req.params.id}, (err, foundUser) => {

      if(foundUser._id.toString() !== req.body.userId){
         foundUser.photos.id(req.params.id).remove();
         foundUser.save((err, savedFoundUser) => {
            Photos.findById(req.body.userId, (err, newUser) => {
              newUser.photos.push(updatedPhotos);
              newUser.save((err, savedFoundUser) => {
                 res.redirect('/photos');
              })
            })
         });

      } else {
          foundUser.photos.id(req.params.id).remove();
          foundUser.photos.push(updatedPhotos);
          foundUser.save((err, data) => {
              res.redirect('/photos');
            });
      }
    });
  });
});



module.exports = router;