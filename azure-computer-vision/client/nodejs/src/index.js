'use strict';

const request = require('request');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const AZURE_COMPUTER_VISION_KEY = process.env.AZURE_COMPUTER_VISION_KEY;
const AZURE_COMPUTER_VISION_LOCATION = process.env.AZURE_COMPUTER_VISION_LOCATION;

const uriBase =
  `https://${AZURE_COMPUTER_VISION_LOCATION}.api.cognitive.microsoft.com/vision/v2.0/analyze`;

const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';

// Request parameters.
const params = {
  'visualFeatures': 'Categories,Description,Color',
  'details': '',
  'language': 'en'
};

const options = {
  uri: uriBase,
  qs: params,
  body: '{"url": ' + '"' + imageUrl + '"}',
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': AZURE_COMPUTER_VISION_KEY
  }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});
