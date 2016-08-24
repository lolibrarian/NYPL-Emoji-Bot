'use strict';

const assert = require('assert');
const Image = require('../src/image');

describe('Image', () => {
  let image = new Image('😱', 'http://example.com');

  describe('#getKey()', () => {
    it('should return a key', () => {
      assert.equal(image.getKey(), '😱');
    });
  });

  describe('#toString()', () => {
    it('should return a URL', () => {
      assert.equal(image.toString(), 'http://example.com');
    });
  });
});
