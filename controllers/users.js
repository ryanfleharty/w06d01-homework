const express = require('express');
const router  = express.Router();
const Users  = require('../models/users');
const Photos = require('../models/photos');

router.get('/', (req, res) => {
  Users.find({}, (err, foundUsers) => {
      res.render('users/index.ejs', {
        users: foundUsers
     });
  });
});

router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});


router.get('/:id', (req, res) => {
  Users.findById(req.params.id, (err, foundUsers) => {
    res.render('users/show.ejs', {
      users: foundUsers
    });
  });
});

router.get('/:id/edit', (req, res) => {
	Users.findById(req.params.id, (err, foundUsers) => {
    	res.render('users/edit.ejs', {
      		users: foundUsers
    });
  });
});

router.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUsers)=> {
    console.log(updatedUsers, ' this is updatedUsers');
    	res.redirect('/users');
  });
});


router.post('/', (req, res) => {
  	Users.create(req.body, (err, createdUsers) => {
  		if(err){
  			console.log(err)
  		} else {
  			console.log("Everythings peachy king!")
  		}
  		console.log(req.body)
    	console.log(createdUsers, ' this is the created user');
    		res.redirect('/users');

  });
});


router.delete('/:id', (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err, deletedUsers) => {
    console.log(deletedUsers, ' this is deletedUsers');
		const photosIds = [];
    		for(let i = 0; i < deletedUsers.photos.length; i++){
      			photosIds.push(deletedUsers.photos[i].id);
    			}
					Photos.remove({
      		_id: { $in: photosIds}
    	}, (err, data) => {
      res.redirect('/users')
    });
  });
});



module.exports = router;
