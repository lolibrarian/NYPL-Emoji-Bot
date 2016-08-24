'use strict';

const assert = require('assert');

const ReplyTweet = require('../../src/tweets/reply_tweet');

const RequestTweet = require('../../src/tweets/request_tweet');
const Image = require('../../src/image');

describe('ReplyTweet', () => {
  let image = new Image('👍', 'http://example.com');

  describe('#getText', () => {
    describe('modifier absent', () => {
      let request_tweet = new RequestTweet({
        text: 'hello 👍 bot',
        user: { screen_name: 'some_screen_name' }
      });

      it('should return a tweet', () => {
        let reply_tweet = new ReplyTweet(request_tweet, image);

        assert.equal(reply_tweet.getText(), '@some_screen_name 👍 http://example.com');
      });
    });

    describe('modifier present', () => {
      let request_tweet = new RequestTweet({
        text: 'hello 👍🏿 bot',
        user: { screen_name: 'some_screen_name' }
      });

      it('should return a tweet with the modifier used', () => {
        let reply_tweet = new ReplyTweet(request_tweet, image);

        assert.equal(reply_tweet.getText(), '@some_screen_name 👍🏿 http://example.com');
      });
    });
  });

  describe('#getInReplyToStatusID', () => {
    let request_tweet = new RequestTweet({ id_str: '123' });

    it('should return a status ID', () => {
      let reply_tweet = new ReplyTweet(request_tweet, image);

      assert.equal(reply_tweet.getInReplyToStatusID(), '123');
    });
  });
});
