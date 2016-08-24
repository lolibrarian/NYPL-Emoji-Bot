'use strict';

const findModifier = require('../find_modifier');

class ReplyTweet {
  constructor(request_tweet, image) {
    this.request_tweet = request_tweet;
    this.image = image;
  }

  getText() {
    return `@${this.request_tweet.getScreenName()} ${this.getEmojiWithModifier()} ${this.image.toString()}`;
  }

  /**
   * If a Fitzpatrick modifier is found in the request tweet, combines it with the image key
   */
  getEmojiWithModifier() {
    let key = this.image.getKey();
    let modifier = findModifier(key, this.request_tweet.getText());

    return modifier ? (key + modifier) : key;
  }

  getInReplyToStatusID() {
    return this.request_tweet.getStatusID();
  }
}

module.exports = ReplyTweet;
