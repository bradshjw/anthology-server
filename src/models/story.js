// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Story = mongoose.model('Story', new Schema({
  title: String,
  body: String,
  author: String
}));

module.exports = Story;