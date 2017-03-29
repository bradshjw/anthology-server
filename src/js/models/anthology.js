'use strict';

var mongoose = require('mongoose');
var Author = require('./author');
var StoryPreview = require('./storyPreview');
var Schema = mongoose.Schema;

var Anthology = mongoose.model('Anthology', new Schema({
  _id: String,
  name: String,
  storyPreviews: [StoryPreview.schema],
  authors: [Author.schema]
}));

module.exports = Anthology;