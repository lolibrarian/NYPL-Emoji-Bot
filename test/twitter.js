'use strict';

const assert = require('assert');

process.env.TWITTER_CONSUMER_KEY = 'some_consumer_key';
process.env.TWITTER_CONSUMER_SECRET = 'some_consumer_secret';
process.env.TWITTER_ACCESS_TOKEN = 'some_access_token';
process.env.TWITTER_ACCESS_TOKEN_SECRET = 'some_access_token_secret';

const Twitter = require('../src/twitter');

describe('Twitter', () => {
  describe('.isMentioned()', () => {
    let payload = {
      entities: {
        user_mentions: [
          { screen_name: 'some_bot' }
        ]
      }
    };

    describe('is mentioned', () => {
      it('should return true', () => {
        let result = Twitter.isMentioned(payload, 'some_bot');

        assert.equal(result, true);
      });
    });

    describe('is not mentioned', () => {
      it('should return false', () => {
        let result = Twitter.isMentioned(payload, 'some_other_bot');

        assert.equal(result, false);
      });
    });
  });

  describe('.isRetweet()', () => {
    describe('a retweet', () => {
      let payload = {
        retweeted_status: 'some value'
      };

      it('should return true', () => {
        let result = Twitter.isRetweet(payload);

        assert.equal(result, true);
      });
    });

    describe('not a retweet', () => {
      let payload = {};

      it('should return false', () => {
        let result = Twitter.isRetweet(payload);

        assert.equal(result, false);
      });
    });
  });
});
