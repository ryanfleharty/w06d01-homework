const mongoose = require('mongoose');

const photoSchema = mongoose.Schema = {
  url: {type:String, require:true},
  title: String
}

module.exports = mongoose.model('Photo', photoSchema);