var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Event = mongoose.model('Event', new Schema({
  _id: String,
  storyId: String,
  eventDate: Date,
  complete: Boolean
}));

module.exports = Event;