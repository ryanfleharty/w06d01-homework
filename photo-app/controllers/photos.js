const express = require('express');
const router = express.Router();
const {Photo} = require('../models/photos');
const {User} = require('../models/users');

router.get('/', (req, res) => {
  Photo.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      User.findOne()
      res.render('photos/index.ejs', {
        photos:data
      });
    }
  })
});

// render the new photo page. also pass the user array  DONE
router.get('/new', (req, res) => {
  User.find({}, (err, data) => {    
    if (err) {
      console.log(err);
    } else {
      res.render('photos/new.ejs', {
        users: data
      })
    }
  })
})

// update the photos (also its user)   DONE
router.get('/:id/edit', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    if (err) {
      console.log(err);
    } else {
      User.find({}, (err, foundUsers) => {
        User.findOne({ 'photos._id': req.params.id }, (err, foundPhotoUser) => {
          res.render('photos/edit.ejs', {
            photo: foundPhoto, 
            users: foundUsers,  // all users
            photoUser: foundPhotoUser // user that currently is associated with photo
          });
        });
      })
    }
  })
})

// Show photo show page (also grabs its user)  DONE
router.get('/:id', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    User.findOne({ 'photos._id': req.params.id }, (err, foundUser) => { // user that has the photo
      console.log(foundUser);
      
      res.render('photos/show.ejs', {
        photo: foundPhoto,
        user: foundUser
      });
    });
  });
});


// create new photo (also update user data) DONE
router.post('/', (req, res) => {
  User.findById(req.body.userId, (err, foundUser) => {    
    if (err) {
      console.log(err);
    } else {
      Photo.create(req.body, (err, createdPhoto) => {
        if (err) {
          console.log(err);
        } else {
          foundUser.photos.push(createdPhoto);
          foundUser.save((err, data) => {
            res.redirect('/photos')
          })
        }
      })
    }
  })
})

// CPOPIED FROM JIMS   Updates the photos and user photo array - DONE
router.put('/:id', (req, res) => {    
  Photo.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPhoto) => {    
    User.findOne({ 'photos._id': req.params.id }, (err, foundUser) => { // find user associate w photo      
      if (foundUser._id.toString() !== req.body.userId) { // if editing record with new user
        // removing that article from the old author and then saving it
        foundUser.photos.id(req.params.id).remove();
        foundUser.save((err, savedFoundAuthor) => {
          // Find the new author and and the article to thier array
          User.findById(req.body.userId, (err, newUser) => {
            newUser.photos.push(updatedPhoto);
            newUser.save((err, savedFoundAuthor) => {
              res.redirect('/photos');
            })
          })
        });
      } else {
        // If the author is the same as it was before
        // first find the article and removing, req.params.id = articles id
        foundUser.photos.id(req.params.id).remove();
        foundUser.photos.push(updatedPhoto);
        foundUser.save((err, data) => {
          res.redirect('/photos');
        });
      }
    })
  })
})


router.delete('/:id', (req, res) => {
  Photo.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
        foundUser.photos.id(req.params.id).remove();
        foundUser.save((err, data) => {
          res.redirect('/photos');
        })
      })
    }
  })
})

module.exports = router;