var express = require('express');
var router = express.Router();
var faker = require('faker');
var gmail = require('./gmailService');
var Story = require('./../models/story');
var Promise = require('promise');
var _ = require('lodash');
var Author = require('./../models/author');


function getMail(req, res, next) {
  console.log("Attempting to contact gmail");
  gmail.fetchMail(res, handleMailResponse);
}

function handleMailResponse(res, messages) {
  console.log("Received messages");
  res.send(messages);
}

function getLabels(req, res, next) {
  console.log("Attempting to contact gmail");
  gmail.fetchLabels(res, handleMailResponse);
}

function getThread(req, res, next) {
  console.log("Attempting to fetch thread from gmail");
  var threadId = req.params.id;
  gmail.fetchThreadById(threadId, res, extractThreadData);
}

function extractThreadData(res, data) {
  // need to convert the data into a story object
  var message = data.messages[0];
  var headerData = message.payload.headers;
  console.log(headerData);
  var subject = _.find(headerData, function (row) {
    return row.name == 'Subject';
  });
  var from = _.find(headerData, function (row) {
    return row.name == 'From';
  });
  var name = _.find(headerData, function (row) {
    return row.name == 'Sender';
  });
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
  res.send(newStory);
}

router.get('/mail', getMail);
router.get('/labels', getLabels);
router.get('/threads/:id', getThread);

module.exports = router;