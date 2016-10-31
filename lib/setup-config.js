'use strict';

const AWS = require('aws-sdk');
const config = require('config');
AWS.config.update({
  region: 'ap-southeast-2'
});

const kms = new AWS.KMS();

function decryptThis(decryptThis) {
  return kms.decrypt({
    CiphertextBlob: Buffer(decryptThis, 'base64')
  }).promise().then(data => {
    return data.Plaintext.toString('ascii');
  })
  .catch(error => {
    logger.error(`Error while trying to decrypt this:${decryptThis}`, error);
    throw Error('Could not decrypt this value: ${decryptThis}');
  });
}

module.exports.setupSettings = () => {
  return decryptThis("AQECAHgjbLrg6ukX1LqIwdRCYslQEuCYl8KiBVISp0HkmSJWVQAAAGkwZwYJKoZIhvcNAQcGoFowWAIBADBTBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDJqZzKNuxgFp81i0uwIBEIAmXleqr0BKk9RmGn9x7aBdHwQnOdVjtB0T+DLnT1F/ULFxl8qXKC8=")
  .then(decryptedSetting => {
    console.log(' decryption done');
    config.secret = decryptedSetting;
  });
};