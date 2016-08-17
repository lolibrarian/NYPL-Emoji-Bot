'use strict';

const Images = require('../src/images');

let text = process.argv[2];
let image = new Images().getFromText(text);

console.log(image);
