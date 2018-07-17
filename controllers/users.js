const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.get('/', (req, res) => {
	Users.find({}, (err, foundUsers) => {
		if(err) {
			res.send(err);
		} else {
			res.render('users/index.ejs', {
				users: foundUsers
			});
		};
	});
});

router.get('/new', (req, res) => {
	res.render('users/new.ejs');
});





module.exports = router;