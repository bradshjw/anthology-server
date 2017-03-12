var mongoose = require('mongoose');
var Author = require('./author');
var Schema = mongoose.Schema;

var StoryPreview = mongoose.model('StoryPreview', new Schema({
  _id: String,
  _threadId: String,
  title: String,
  excerpt: String,
  received: Date,
  read: Boolean,
  author: Author.schema
}));

module.exports = StoryPreview;