var Story = require('./../models/story');
var _ = require('lodash');
var Author = require('./../models/author');
var StoryPreview = require('../models/storyPreview');

module.exports = {

  convertStory: function (data) {
    // need to convert the data into a story object
    var message = data.messages[0];
    var headerData = message.payload.headers;
    var subject = _.find(headerData, function (row) {
      return row.name == 'Subject';
    });
    var from = _.find(headerData, function (row) {
      return row.name == 'From';
    });
    var name = _.find(headerData, function (row) {
      return row.name == 'Sender';
    });
    if (name == undefined || name == null) {
      name = from;
    }
    var received = _.find(headerData, function (row) {
      return row.name == 'Date';
    });

    var newStory = new Story({
      threadId: message.threadId,
      title: subject.value,
      content: message.snippet,
      author: new Author({
        name: name.value,
        email: from.value
      }),
      received: received.value
    });

    return newStory;
  },

  convertPreview: function (data) {
    var threads = data.threads;
    var previews = [];
    _.forEach(threads, function (thread) {
      var preview = new StoryPreview({
        id: thread.id,
        threadId: thread.threadId,
        excerpt: thread.snippet,
        read: false,
      });

      previews.push(preview);
    })

    return previews;
  }
}