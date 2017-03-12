var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task = mongoose.model('Task', new Schema({
  _id: String,
  storyId: String,
  dueDate: Date,
  complete: Boolean,
  completeDate: Date
}));

module.exports = Task;