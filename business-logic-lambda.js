'use strict';
let settings = require('./lib/setup-config');

let configSet;
let config = require('config');

// Your first function handler
module.exports.handler = (event, context, cb) => {
  console.log('executing lambda');
  if (configSet) {
    console.log('no decryption necessary');
    console.log('----CONFIG----', config);
    cb(null, { message: 'I\'m a greeting endpoint, hello there!' });
  } else {
    console.log('attempting decryption');
    settings.setupSettings()
    .then(() => {
      configSet = new Date();
      console.log('----CONFIG----', config);
      cb(null, { message: 'I\'m a greeting endpoint, hello there!' });
    })
    .catch(error => {
      cb(`[500] cant run this ${error}`);
    });
  }
};