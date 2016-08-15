'use strict';

const emoji = require('node-emoji');
const emojiRegex = require('emoji-regex');

const data = require('../data/images');
const Image = require('./image');
const Incomplete = require('./incomplete');

class Images {
  constructor (records) {
    this.records = records || data;
  }

  getRandom() {
    let records = rejectIncomplete(this.records);
    let emoji_name = randomMember(Object.keys(records));

    return getImage(records, emoji_name);
  }

  getFromTweet(message) {
    let emoji_name = getFirstEmojiName(message);

    return getImage(this.records, emoji_name);
  }
}

function getFirstEmojiName(message) {
  let matches = message.match(emojiRegex());
  if (!matches) { return null; }

  let character = matches[0];
  let name = emoji.which(character);

  return name;
}

function getImage(records, emoji_name) {
  let urls = records[emoji_name];

  if (urls === undefined) {
    return null; // record not found
  } else if (urls.length === 0) {
    return new Incomplete(emoji_name);
  }

  let url = randomMember(urls);

  return new Image(emoji_name, url);
}

function randomMember(array) {
  return array[array.length * Math.random() << 0];
}

function rejectIncomplete(records) {
  let result = {};

  Object.keys(records).map((emoji_name) => {
    let urls = records[emoji_name];

    if (urls.length > 0) {
      result[emoji_name] = urls;
    }
  });

  return result;
}

module.exports = Images;
