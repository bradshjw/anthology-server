var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Author = mongoose.model('Author', new Schema({
  id: String,
  name: String,
  email: String,
  ignored: Boolean
}));

module.exports = Author;