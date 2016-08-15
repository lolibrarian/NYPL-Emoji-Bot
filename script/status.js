'use strict';

const Images = require('../src/images');
const Tweet = require('../src/tweet');
const Twitter = require('../src/twitter');

let image = new Images().getRandom();
let tweet = new Tweet(image).getStatus();

Twitter.post(tweet);
