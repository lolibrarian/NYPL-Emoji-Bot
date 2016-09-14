'use strict';

const data = require('../data/images');
const blacklist = require('../data/blacklist');
const Image = require('./image');
const ImageIncomplete = require('./image_incomplete');
const firstBy = require('thenby');

const VARIATION_SELECTOR_MATCHER = /\uFE0F$/;

class Images {
  constructor (records) {
    this.records = records || data;
  }

  getRandom() {
    let completeKeys = getCompleteKeys(this.records);
    let allowedKeys = getAllowedKeys(completeKeys);
    let key = randomMember(allowedKeys);

    return getImage(this.records, key);
  }

  getFromText(text) {
    let keys = getSortedKeys(this.records);

    let key = keys.find((key) => {
      key = getBaseCodepoint(key);

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
    return new ImageIncomplete(key);
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

function getAllowedKeys(keys) {
  return keys.filter((key) => {
    return blacklist.indexOf(key) === -1;
  });
}

function getSortedKeys(records) {
  return Object.keys(records).sort(
    firstBy((a, b) => { return b.length - a.length; })
    .thenBy((a, b) => { return records[b].length - records[a].length; })
  );
}

/**
 * Get the base codepoint, without the VS16 variation selector
 *
 * When searching, matching against the base character casts a wider net than the full emoji. In some cases, on some
 * platforms, they're visually identical.
 *
 * For more information, please see: https://en.wikipedia.org/wiki/Emoji#Emoji_versus_text_presentation
 *
 * @param  {String} character
 * @return {String}
 */
function getBaseCodepoint(character) {
  return character.replace(VARIATION_SELECTOR_MATCHER, '');
}

module.exports = Images;
