'use strict';

const Images = require('../src/images');

let character = process.argv[2];
let image = new Images().getFromText(character);

console.log(image);
