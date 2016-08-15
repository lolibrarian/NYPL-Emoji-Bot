'use strict';

const Twit = require('twit');

const twit = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Twitter = {
  post: (message) => {
    update({ status: message });
  },

  reply: (message, to_status_id) => {
    update({ status: message, in_reply_to_status_id: to_status_id });
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
