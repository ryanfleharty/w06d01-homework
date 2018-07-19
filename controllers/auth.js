const express = require('express');
const router = express.Router();
const User = require('../models/users');

// login route
router.get('/', (req, res) => {
	res.render('auth/login.ejs', {
		message: req.session.message
	});
});

router.post('/login', (req, res) => {
	console.log(req.session);

	req.session.loggedIn = true;
	req.session.username = req.body.username;

	res.redirect('/');
});

// logging out
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err) {
			res.send('error when attempting to destory session');
		} else {
			res.redirect('/auth');
		};
	});
});


module.exports = router;