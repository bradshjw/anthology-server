var express = require('express');
var router = express.Router();
var faker = require('faker');
var gmail = require('./gmailService');
var Story = require('./../models/story');
var Promise = require('promise');
var _ = require('lodash');
var Author = require('./../models/author');
var Converter = require('./conversionHandler');


function getMail(req, res, next) {
  console.log("Attempting to contact gmail");
  gmail.fetchMail(res, extractMail);
}

function extractMail(res, messages) {
  var previews = Converter.convertPreview(messages);
  res.send(previews);
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
  var newStory = Converter.convertStory(data);
  res.send(newStory);
}

router.get('/mail', getMail);
router.get('/labels', getLabels);
router.get('/threads/:id', getThread);

module.exports = router;