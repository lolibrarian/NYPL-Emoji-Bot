'use strict';

const assert = require('assert');

const RequestTweet = require('../../src/tweets/request_tweet');

describe('RequestTweet', () => {
  describe('#getText', () => {
    let payload = { text: 'some text' };

    it('returns the value', () => {
      let tweet = new RequestTweet(payload);
      let text = tweet.getText();

      assert.equal(text, 'some text');
    });
  });

  describe('#getStatusID()', () => {
    let payload = { id_str: '123' };

    it('returns the value', () => {
      let tweet = new RequestTweet(payload);
      let id = tweet.getStatusID();

      assert.equal(id, '123');
    });
  });

  describe('#getScreenName', () => {
    let payload = {
      user: { screen_name: 'some_screen_name' }
    };

    it('returns the value', () => {
      let tweet = new RequestTweet(payload);
      let screen_name = tweet.getScreenName();

      assert.equal(screen_name, 'some_screen_name');
    });
  });

  describe('#isMentioned()', () => {
    let payload = {
      entities: {
        user_mentions: [
          { screen_name: 'some_bot' }
        ]
      }
    };

    describe('is mentioned', () => {
      it('should return true', () => {
        let tweet = new RequestTweet(payload);
        let result = tweet.isMentioned('some_bot');

        assert.equal(result, true);
      });
    });

    describe('is not mentioned', () => {
      it('should return false', () => {
        let tweet = new RequestTweet(payload);
        let result = tweet.isMentioned('some_other_bot');

        assert.equal(result, false);
      });
    });
  });

  describe('#isRetweet()', () => {
    describe('a retweet', () => {
      let payload = {
        retweeted_status: 'some value'
      };

      it('should return true', () => {
        let tweet = new RequestTweet(payload);
        let result = tweet.isRetweet();

        assert.equal(result, true);
      });
    });

    describe('not a retweet', () => {
      let payload = {};

      it('should return false', () => {
        let tweet = new RequestTweet(payload);
        let result = tweet.isRetweet();

        assert.equal(result, false);
      });
    });
  });
});
