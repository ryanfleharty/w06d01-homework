const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photoSite');

mongoose.connection.on('connected', () => {
	console.log('mongoose is connected');
});

mongoose.connection.on('error', (err) => {
	console.log(err, 'mongoose aint schemin right now');
});

mongoose.connection.on('disconnected', () => {
	console.log('mongoose is sleeping');
});