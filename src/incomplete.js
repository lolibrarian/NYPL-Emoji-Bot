'use strict';

const emoji = require('node-emoji');

class Incomplete {
  constructor(emoji_name) {
    this.emoji_name = emoji_name;
  }

  toString() {
    let character = emoji.get(this.emoji_name);

    return `${character} ¯\\_(ツ)_/¯ Try searching digitalcollections.nypl.org for that!`;
  }
}

module.exports = Incomplete;
