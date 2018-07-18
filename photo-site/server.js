const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Photo = require('./models/photos.js');
const User = require('./models/users.js');
require('./db/db');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extend:false}));
app.use(express.static('public'));



const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const photosController = require('./controllers/photos.js');
app.use('/photos', photosController);

app.get('/', (req, res) => {
	Photo.find({}, (err, foundPhotos) => {
		User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
			res.render('index.ejs', {
				photos: foundPhotos,
				user: foundUser
			});
		});
	});
});



app.listen(3000, () => {
	console.log("Ready for your close-up, Ms. Tyra");
});