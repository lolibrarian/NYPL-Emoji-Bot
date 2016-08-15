'use strict';

class Tweet {
  constructor(image) {
    this.image = image;
  }

  getStatus() {
    return this.image.toString();
  }

  getReply(screen_name) {
    return `@${screen_name} ${this.image.toString()}`;
  }
}

module.exports = Tweet;
