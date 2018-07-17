const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

require('./db/db');

const usersController = require('./controllers/users');
app.use('/users', usersController);

const photosController = require('./controllers/photos');
// app.use('/photos', photosController);

app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.listen(3000, () => {
	console.log('app is listening on port 3000');
});