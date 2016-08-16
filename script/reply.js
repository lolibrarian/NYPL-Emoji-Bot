'use strict';

const Images = require('../src/images');
const Tweet = require('../src/tweet');
const Twitter = require('../src/twitter');

let stream = Twitter.stream();

stream.on('tweet', (payload) => {
  let status_id = payload.id_str;

  if (shouldReply(payload)) {
    let image = new Images().getFromText(payload.text);
    if (!image) { return; }

    let tweet = new Tweet(image).getReply(payload.user.screen_name);
    Twitter.reply(tweet, status_id);
  }
});

stream.on('error', (payload) => {
  console.error(payload);
});

function shouldReply(payload) {
  return Twitter.isMentioned(payload) && !Twitter.isRetweet(payload);
}
