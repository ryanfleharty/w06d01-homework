const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
}));

require('./db/db');

const usersController = require('./controllers/users');
app.use('/users', usersController);

const photosController = require('./controllers/photos');
app.use('/photos', photosController);

const authController = require('./controllers/auth');
app.use('/auth', authController);

app.get('/', (req, res) => {
	console.log(req.session, ' this is req.session in index');
	if (req.session.loggedIn === true) {
		res.render('index.ejs', {
			username: req.session.username
		});
	} else {
		req.session.message = 'You must be logged in to access the site';
		res.redirect('/auth');
	};
});

app.listen(3000, () => {
	console.log('app is listening on port 3000');
});