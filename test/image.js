'use strict';

const assert = require('assert');
const Image = require('../src/image');

describe('Image', () => {
  let image = new Image('😱', 'http://example.com');

  describe('#toString()', () => {
    it('should return a message', () => {
      assert.equal(image.toString(), '😱 http://example.com');
    });
  });
});
