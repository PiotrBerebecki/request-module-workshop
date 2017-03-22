'use strict';

const request = require('request');
const http = require('http');
const https = require('https');
const urlModule = require('url');

/*
create your own request module here.
It should take a url to make a http GET request, and a callback function with three arguments;
1. error (String: if an error occurred),
2. response(Object; includes the response & statusCode of the request),
3. body (String; includes the body of the request)
*/


const myRequest = (url, callback) => {
  const protocol = urlModule.parse(url).protocol;

  (protocol === 'http:' ? http : https).get(url, (response) => {

    let holder = '';

    response.on('data', (chunk) => {
      holder += chunk;
    });

    response.on('end', () => {
      return callback(null, response, holder);
    });

  }).on('error', (err) => {
    callback(err);
  });
};

// Helper
const testRequest = (module) => {
  module('https://jsonplaceholder.typicode.com/users/1', function(error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
};

// request module test
testRequest(request);

// // myRequest module test
testRequest(myRequest);
