'use strict';

const Images = require('../src/images');
const StatusTweet = require('../src/tweets/status_tweet');
const Twitter = require('../src/twitter');

let image = new Images().getRandom();
let status_tweet = new StatusTweet(image);

Twitter.post(status_tweet);
