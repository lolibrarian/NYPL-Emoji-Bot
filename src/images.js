'use strict';

const data = require('../data/images');
const Image = require('./image');
const Incomplete = require('./incomplete');
const firstBy = require('thenby');

class Images {
  constructor (records) {
    this.records = records || data;
  }

  getRandom() {
    let keys = getCompleteKeys(this.records);
    let key = randomMember(keys);

    return getImage(this.records, key);
  }

  getFromText(text) {
    let keys = getSortedKeys(this.records);

    let key = keys.find((key) => {
      return text.indexOf(key) !== -1;
    });

    return getImage(this.records, key);
  }
}

function getImage(records, key) {
  let urls = records[key];

  if (urls === undefined) {
    return null; // record not found
  } else if (urls.length === 0) {
    return new Incomplete(key);
  }

  let url = randomMember(urls);

  return new Image(key, url);
}

function randomMember(array) {
  return array[array.length * Math.random() << 0];
}

function getCompleteKeys(records) {
  return Object.keys(records).filter((key) => {
    return records[key].length > 0;
  });
}

function getSortedKeys(records) {
  return Object.keys(records).sort(
    firstBy((a, b) => { return b.length - a.length; })
    .thenBy((a, b) => { return records[b].length - records[a].length; })
  );
}

module.exports = Images;
