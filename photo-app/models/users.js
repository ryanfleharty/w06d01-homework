const mongoose = require('mongoose');
const {photoSchema} = require('./photos');

// schema
const userSchema =  new mongoose.Schema({
  userName: {type:String, require:true},
  password: String,
  photos: [photoSchema]
});

// model
const User = mongoose.model('User', userSchema);

// instantiate a user
// const user1 = new User({userName: 'seed_user2', password:'password'})
// user1.save();

// export model and schema
module.exports = {
  User,
  userSchema
}