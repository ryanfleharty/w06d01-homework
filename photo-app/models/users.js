const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {type:String, require:true, unique:true},
  password: String
});

module.exports = mongoose.model('User', userSchema);