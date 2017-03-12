var mongoose = require('mongoose');
var Author = require('./author');
var Audience = require('./audience');
var Schema = mongoose.Schema;

var Comment = mongoose.model('Comment', new Schema({
  _id: String,
  threadId: String,
  author: Author.schema,
  created: Date,
  audiences: [Audience.schema],
  hidden: Boolean,
  comments: [this]
}));

module.exports = Comment;