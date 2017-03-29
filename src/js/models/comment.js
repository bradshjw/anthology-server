'use strict';

var mongoose = require('mongoose');
var Author = require('./author');
var Audience = require('./audience');
var Schema = mongoose.Schema;

var Comment = new Schema({
  _id: String,
  threadId: String,
  author: Author.schema,
  created: Date,
  audiences: [Audience.schema],
  hidden: Boolean
});

Comment.add({ comments: [Comment] });

module.exports = Comment;