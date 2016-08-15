'use strict';

const Images = require('../src/images');
const Tweet = require('../src/tweet');
const Twitter = require('../src/twitter');

let stream = Twitter.stream();

stream.on('tweet', (payload) => {
  let status_id = payload.id_str;

  if (isReply(payload)) {
    let image = new Images().getFromText(payload.text);
    if (!image) { return; }

    let tweet = new Tweet(image).getReply(payload.user.screen_name);
    Twitter.reply(tweet, status_id);
  }
});

stream.on('error', (payload) => {
  console.error(payload);
});

function isReply(payload) {
  return payload.in_reply_to_screen_name === process.env.TWITTER_SCREEN_NAME;
}
