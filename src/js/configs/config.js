"use strict";

module.exports = {
  "mailSettings": [{
    "gmail": {
      "email": "bradshaw.jw@gmail.com",
      "user": "bradshaw.jw@gmail.com",
      "password": "MYPASSWORD",
      "imap": {
        "host": "imap.gmail.com",
        "port": 993,
        "secure": true
      },
      "smtp": {
        "host": "smtp.gmail.com",
        "ssl": true
      }
    }
  }],
  'database': 'mongodb://node:nodejsadmin@localhost:27017/e2r'
};