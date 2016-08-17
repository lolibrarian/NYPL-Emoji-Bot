'use strict';

class Image {
  constructor(key, url) {
    this.key = key;
    this.url = url;
  }

  toString() {
    return `${this.key} ${this.url}`;
  }
}

module.exports = Image;
