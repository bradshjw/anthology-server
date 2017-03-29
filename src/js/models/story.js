'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Author = require('./author');
var Audience = require('./audience');
var Comment = require('./comment');
var Schema = mongoose.Schema;

var Story = new Schema({
  _id: String,
  threadId: String,
  title: String,
  content: String,
  author: Author.schema,
  audience: [Audience.schema],
  received: Date,
  hidden: Boolean,
  read: Boolean
});

Story.add({ comments: [Comment] });

module.exports = Story;