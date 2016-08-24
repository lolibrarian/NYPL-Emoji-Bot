'use strict';

class Image {
  constructor(key, url) {
    this.key = key;
    this.url = url;
  }

  getKey() {
    return this.key;
  }

  toString() {
    return this.url;
  }
}

module.exports = Image;
