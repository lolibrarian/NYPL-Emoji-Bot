const Twit = require('twit');

const twit = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Twitter = {
  post: (message) => {
    twit.post('statuses/update', { status: message }, (error) => {
      error && console.error(error);
    });
  },

  stream: () => {
    return twit.stream('user');
  }
};

module.exports = Twitter;
