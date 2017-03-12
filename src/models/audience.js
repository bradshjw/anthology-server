var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Audience = mongoose.model('Audience', new Schema({
  _id: String,
  name: String,
  email: String
}));

module.exports = Audience;