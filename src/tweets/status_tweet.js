'use strict';

class StatusTweet {
  constructor(image) {
    this.image = image;
  }

  getText() {
    return `${this.image.getKey()} ${this.image.toString()}`;
  }
}

module.exports = StatusTweet;
