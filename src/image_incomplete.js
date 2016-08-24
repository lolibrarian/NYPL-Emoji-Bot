'use strict';

class ImageIncomplete {
  constructor(key) {
    this.key = key;
  }

  getKey() {
    return this.key;
  }

  toString() {
    return '¯\\_(ツ)_/¯ Try searching digitalcollections.nypl.org for that!';
  }
}

module.exports = ImageIncomplete;
