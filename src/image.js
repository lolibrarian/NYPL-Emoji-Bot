'use strict';

const emoji = require('node-emoji');

class Image {
  constructor(emoji_name, url) {
    this.emoji_name = emoji_name;
    this.url = url;
  }

  toString() {
    return `${getEmojiCharacter(this)} ${this.url}`;
  }
}

function getEmojiCharacter(image) {
  return emoji.get(image.emoji_name);
}

module.exports = Image;
