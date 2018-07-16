const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

require('./db/db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

const usersControler = require('./controllers/users');
const photosControler = require('./controllers/photos');
app.use('/users', usersControler);
app.use('/photos', photosControler);

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(port, () => {
  console.log('App is listening on port ' + port);
})