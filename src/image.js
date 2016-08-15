'use strict';

const emoji = require('node-emoji');

class Image {
  constructor(emoji_name, url) {
    this.emoji_name = emoji_name;
    this.url = url;
  }

  toString() {
    let character = emoji.get(this.emoji_name);

    return `${character} ${this.url}`;
  }
}

module.exports = Image;
