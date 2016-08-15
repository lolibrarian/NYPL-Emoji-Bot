'use strict';

const Images = require('../src/images');
const Tweet = require('../src/tweet');
const Twitter = require('../src/twitter');

let stream = Twitter.stream();

stream.on('tweet', (payload) => {
  if (isReply(payload)) {
    let image = new Images().getFromTweet(payload.text);
    let tweet = new Tweet(image).getReply(payload.user.screen_name);

    Twitter.post(tweet);
  }
});

stream.on('error', (payload) => {
  console.error(payload);
});

function isReply(payload) {
  return payload.in_reply_to_screen_name === process.env.TWITTER_SCREEN_NAME;
}
