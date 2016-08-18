'use strict';

const Images = require('../src/images');

let images = new Images();
let missing = [];

for (var emoji in images.records) {
  if (images.records.hasOwnProperty(emoji) && images.records[emoji].length == 0) {
    missing.push(emoji);
  }
}

console.log(missing);
