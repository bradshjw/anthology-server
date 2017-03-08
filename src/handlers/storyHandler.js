var express = require('express');
var router = express.Router();
var faker = require('faker');
var gmail = require('./authHandler');
var Story = require('./../models/story');
var Promise = require('promise');

function getAllStories(req, res, next) {
  console.log("fetching all stories");

  Story.find(function (err, stories) {
    if (err) res.send(err);

    res.json(stories);
  });
}

function saveTestStory(req, res, next) {
  console.log("saving test story");

  Story.create({
    title: faker.lorem.words(4),
    body: faker.lorem.sentences(4),
    author: faker.name.findName()
  }, function (err, story) {
    if (err) res.send(err);

    Story.find(function (err, stories) {
      if (err) res.send(err);

      res.json(stories);
    });
  });
}

function getMail(req, res, next) {
  console.log("Attempting to contact gmail");

  gmail.fetchMail(res, handleMailResponse);
}

function handleMailResponse(res, messages) {
  return res.json(messages);
}

function getLabels(req, res, next) {
  console.log("Attempting to contact gmail");
  gmail.fetchLabels(res, handleMailResponse);
}

function getThread(req, res, next) {
  console.log("Attempting to fetch thread from gmail");
  var threadId = req.params.id;
  gmail.fetchThreadById(threadId, res, handleMailResponse);
}

router.get('/stories', getAllStories);
router.post('/stories', saveTestStory);
router.get('/mail', getMail);
router.get('/labels', getLabels);
router.get('/threads/:id', getThread);

module.exports = router;