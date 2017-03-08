// var mailParser = require('mailparser').simpleParser;
// var gmail = require('./authenticate');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var storyRouter = require('./handlers/storyHandler');
var config = require('./configs/config');
var homeRouter = express.Router();

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/')));
app.use('/api', storyRouter);


var port = process.env.PORT || '3001';
app.set('port', port);

// route middleware to verify token
function intercept(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;

        next();
      }
    });
  } else {
    // no token, return
    return res.send(403, {
      success: false,
      message: 'No token provided'
    });
  }
}

/**
 * Placeholder for when we intercept
  routerInstance.use(intercept);
  storyRouter.use(intercept);
 */
homeRouter.get('*', function (req, res) {
  res.send('GET request to the homepage at ' + new Date());
});

app.use('/', homeRouter);

var server = http.createServer(app);

server.listen(port, function () {
  console.log("App listening on port " + port);
});
