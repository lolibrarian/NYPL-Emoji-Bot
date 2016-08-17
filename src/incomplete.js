'use strict';

class Incomplete {
  constructor(key) {
    this.key = key;
  }

  toString() {
    return `${this.key} ¯\\_(ツ)_/¯ Try searching digitalcollections.nypl.org for that!`;
  }
}

module.exports = Incomplete;
