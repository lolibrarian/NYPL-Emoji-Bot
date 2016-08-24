'use strict';

const assert = require('assert');

const findModifier = require('../src/find_modifier');

describe('findModifier', () => {
  let key = '👍';

  describe('absent', () => {
    let text = 'hello 👍 bot';

    it('should return null', () => {
      let result = findModifier(key, text);

      assert.equal(result, null);
    });
  });

  describe('present', () => {
    let text = 'hello 👍🏿 bot';

    it('should return the modifier', () => {
      let result = findModifier(key, text);

      assert.equal(result, '🏿');
    });
  });
});
