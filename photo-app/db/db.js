const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/photo-app';
// const url = 'mongodb+srv://ss-user:lxH3y4j7Rdf3k7ir@codeserg-oy22e.mongodb.net/photo-app?retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('connected', (data) => {
  console.log('Connected to MongoDB');
})

db.on('disconnected', (data) => {
  console.log('Disconnected from MongoDB');
})

db.on('error', (err) => {
  console.log(err);
})
