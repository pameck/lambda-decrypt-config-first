'use strict';
const lambda = require("./business-logic-lambda");

let lambdaContext = {
  awsRequestId: 'aws-super-unique-id'
};
let httpEvent = {
};

let lambdaCallback = (error, success) => {
  if (error) {
    console.log('ALL FAILED.', error);
  }
  console.log('ALL DONE.');
};

console.log('***1***');
lambda.handler(httpEvent, lambdaContext, lambdaCallback);