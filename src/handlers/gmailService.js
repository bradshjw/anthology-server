var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var OAuth2 = google.auth.OAuth2;


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

var authToken = getAuthToken();

module.exports = {
  fetchMail: function (res, callback) {
    if (!authToken) {
      authToken = getAuthToken();
    }

    listMail(authToken, res, callback);
  },

  fetchLabels: function (res, callback) {
    if (!authToken) {
      authToken = getAuthToken();
    }
    listLabels(authToken, res, callback);
  },

  fetchThreadById: function (id, res, callback) {
    if (!authToken) {
      authToken = getAuthToken();
    }

    getThreadById(authToken, id, res, callback);
  }
}

function getAuthToken() {
  fs.readFile('./src/client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Gmail API.
    authorize(JSON.parse(content), function (err, auth) {
      if (err) {
        console.log("Something happened during authorization: " + err);
      }
      return auth;
    });

  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  google.options({
    auth: oauth2Client
  });

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err, stream) {
    if (err) {
      return getNewToken(oauth2Client);
    } else {
      var token = JSON.parse(stream);
      oauth2Client.setCredentials({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expiry_date: token.expiry_date
      });
      callback(null, oauth2Client);

    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function (code) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.setCredentials({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expiry_date: token.expiry_date
      });
      storeToken(token);
      return oauth2Client;
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth, res, callback) {
  var gmail = google.gmail('v1');
  gmail.users.labels.list({
    auth: auth,
    userId: 'me'
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    callback(res, response.labels);
  });
}

function listMail(auth, res, callback) {
  var gmail = google.gmail('v1');
  gmail.users.threads.list({
    auth: auth,
    userId: 'me',
    labelIds: [
      'INBOX'
    ]
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    callback(res, response);
  });
}

function getThreadById(auth, threadId, res, callback) {
  var gmail = google.gmail('v1');
  gmail.users.threads.get({
    auth: auth,
    userId: 'me',
    id: threadId,
    format: 'full'
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    callback(res, response);
  });
}