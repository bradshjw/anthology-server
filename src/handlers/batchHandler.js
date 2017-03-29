'use strict';

var _ = require('lodash');
var Batchelor = require('batchelor');
var GmailService = require('./gmailService');

module.exports = {

  buildBatchRequest: function buildBatchRequest(messageList) {
    var multipartList = [];

    var authToken = GmailService.getAuthToken();

    _.forEach(messageList, function (message) {
      var requestObject = {
        'method': 'GET',
        'path': '/me/messages/' + message.id
      };
      multipartList.push(requestObject);
    });

    var batch = new Batchelor({
      'uri': 'https://www.googleapis.com/gmail/v1/users',
      'method': 'POST',
      'auth': {
        'bearer': authToken
      },
      'headers': {
        'Content-Type': 'multipart/mixed'
      }
    });

    batch.add(multipartList).run(function (err, response) {
      if (err) {
        console.log("Error: " + err);
      } else {
        return response;
      }
    });
  }
};