'use strict';

const Twit = require('twit');

const twit = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Twitter = {
  post: (status_tweet) => {
    update({ status: status_tweet.getText() });
  },

  reply: (reply_tweet) => {
    update({ status: reply_tweet.getText(), in_reply_to_status_id: reply_tweet.getInReplyToStatusID() });
  },

  stream: () => {
    return twit.stream('user');
  }
};

function update(params) {
  twit.post('statuses/update', params, (error) => {
    error && console.error(error);
  });
}

module.exports = Twitter;
