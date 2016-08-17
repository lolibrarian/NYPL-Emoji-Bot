'use strict';

const assert = require('assert');
const Image = require('../src/image');
const Tweet = require('../src/tweet');

describe('Tweet', () => {
  let image = new Image('😱', 'http://example.com');
  let tweet = new Tweet(image);

  describe('#getStatus()', () => {
    it('should return a status Tweet', () => {
      let message = tweet.getStatus();

      assert.equal(message, '😱 http://example.com');
    });
  });

  describe('#getReply()', () => {
    it('should return a reply Tweet', () => {
      let message = tweet.getReply('some_name');

      assert.equal(message, '@some_name 😱 http://example.com');
    });
  });
});
