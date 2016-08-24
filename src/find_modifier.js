'use strict';

const FITZPATRICK_MODIFIERS = [
  '\u{1F3FB}', // 1-2
  '\u{1F3FC}', // 3
  '\u{1F3FD}', // 4
  '\u{1F3FE}', // 5
  '\u{1F3FF}'  // 6
];

const FITZPATRICK_MODIFIER_LENGTH = 2;

/**
 * Get the Fitzpatrick skin tone modifier for the given `baseCharacter` in the `text`
 *
 * @param  {String} baseCharacter The base emoji character to find a modifier for
 * @param  {String} text          The full body of text to search within
 * @return {String|undefined}     The Fitzpatrick skin tone modifier found, `undefined` if not`
 */
function findModifier(baseCharacter, text) {
  let nextCharacter = getNextCharacter(baseCharacter, text);

  return FITZPATRICK_MODIFIERS.find((modifier) => {
    return nextCharacter === modifier;
  });
}

function getNextCharacter(startCharacter, text) {
  let startIndex = text.indexOf(startCharacter);
  let nextIndex = startIndex + startCharacter.length;

  return text.slice(nextIndex, nextIndex + FITZPATRICK_MODIFIER_LENGTH);
}

module.exports = findModifier;
