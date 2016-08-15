'use strict';

const assert = require('assert');
const Images = require('../src/images');

describe('Images', () => {
  describe('#getRandom()', () => {
    let records = {
      scream: [ 'http://example.com' ]
    };
    let finder = new Images(records);

    it('should return an image', () => {
      let image = finder.getRandom();

      assert.equal(image.toString(), '😱 http://example.com');
    });
  });

  describe('#getFromText', () => {
    let records = {
      scream: [ 'http://example.com/scream' ],
      '+1': [ 'http://example.com/+1' ],
      gear: [], // record incomplete
      'flag-ma': [ 'http://example.com/wrong' ] // should be ignored
    };
    let finder = new Images(records);

    describe('emoji present', () => {
      describe('record found and complete', () => {
        it('should return an image', () => {
          let image = finder.getFromText('@some_bot 😱');

          assert.equal(image.toString(), '😱 http://example.com/scream');
        });
      });

      describe('with modifier', () => {
        it('should return an image without the modifier', () => {
          let image = finder.getFromText('@some_bot 👍🏿');

          assert.equal(image.toString(), '👍 http://example.com/+1');
        });
      });

      describe('record found, but incomplete', () => {
        it('should return a "Not Found" message', () => {
          let image = finder.getFromText('@some_bot ⚙');

          assert.equal(image.toString(), '⚙ ¯\\_(ツ)_/¯ Try searching digitalcollections.nypl.org for that!');
        });
      });

      describe('record not found', () => {
        it('should return null', () => {
          let image = finder.getFromText('@some_bot 😖');

          assert.equal(image, null);
        });
      });

      describe('flag', () => {
        it('is ignored', () => {
          let image = finder.getFromText('@some_bot 🇲🇽');

          assert.equal(image, null);
        });
      });
    });

    describe('emoji absent', () => {
      it('should return null', () => {
        let finder = new Images(records);
        let image = finder.getFromText('@some_bot hello');

        assert.equal(image, null);
      });
    });
  });
});
