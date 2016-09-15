'use strict';

const assert = require('assert');
const Images = require('../src/images');

describe('Images', () => {
  describe('#getRandom()', () => {
    describe('not blacklisted', () => {
      let records = {
        '😱': [ 'http://example.com' ]
      };

      it('should return an image', () => {
        let images = new Images(records);
        let image = images.getRandom();

        assert.equal(image.getKey(), '😱');
        assert.equal(image.toString(), 'http://example.com');
      });
    });

    describe('blacklisted', () => {
      let records = {
        '🔫': [ 'http://example.com' ]
      };

      it('should return null', () => {
        let images = new Images(records);
        let image = images.getRandom();

        assert.equal(image, null);
      });
    });
  });

  describe('#getFromText', () => {
    describe('emoji present', () => {
      describe('record found and complete', () => {
        describe('sequence length', () => {
          let records = {
            // shorter sequences should be skipped:
            '👩': [ 'http://example.com/woman' ],
            '👦': [ 'http://example.com/boy' ],
            '👩‍👦': [ 'http://example.com/family-woman-boy' ],
            // in favor of longer ones:
            '👩‍👦‍👦': [ 'http://example.com/family-woman-woman-boy' ]
          };

          it('should return a longer sequence over a shorter one', () => {
            let images = new Images(records);
            let image = images.getFromText('@some_bot 👩‍👦‍👦');

            assert.equal(image.getKey(), '👩‍👦‍👦');
            assert.equal(image.toString(), 'http://example.com/family-woman-woman-boy');
          });
        });

        describe('URL length', () => {
          let records = {
            // incomplete records should be skipped:
            '🏿': [],
            // in favor of complete ones:
            '👍': [ 'http://example.com/+1' ]
          };

          it('should return a complete record over an incomplete one', () => {
            let images = new Images(records);
            let image = images.getFromText('@some_bot 👍🏿');

            assert.equal(image.getKey(), '👍');
            assert.equal(image.toString(), 'http://example.com/+1');
          });
        });

        describe('variation selector characters', () => {
          let records = {
            '\u26C4\uFE0F': [ 'http://example.com/' ]
          };

          let images = new Images(records);

          describe('present in text', () => {
            let text = '\u26C4\uFE0F';

            it('should return a record', () => {
              let image = images.getFromText('@some_bot ' + text);

              assert.equal(image.getKey(), '⛄️');
              assert.equal(image.toString(), 'http://example.com/');
            });
          });

          describe('missing in text', () => {
            let text = '\u26C4';

            it('should return a record', () => {
              let image = images.getFromText('@some_bot ' + text);

              assert.equal(image.getKey(), '⛄️');
              assert.equal(image.toString(), 'http://example.com/');
            });
          });
        });
      });

      describe('record found, but incomplete', () => {
        let records = {
          '⚙': []
        };

        it('should return a "Not Found" message', () => {
          let images = new Images(records);
          let image = images.getFromText('@some_bot ⚙');

          assert.equal(image.getKey(), '⚙');
          assert.equal(image.toString(), '¯\\_(ツ)_/¯ Try searching digitalcollections.nypl.org for that!');
        });
      });

      describe('record not found', () => {
        let records = {
          '😱': [ 'http://example.com/scream' ],
        };

        it('should return null', () => {
          let images = new Images(records);
          let image = images.getFromText('@some_bot 😖');

          assert.equal(image, null);
        });
      });
    });

    describe('emoji absent', () => {
      let records = {
        '😱': [ 'http://example.com/scream' ],
      };

      it('should return null', () => {
        let images = new Images(records);
        let image = images.getFromText('@some_bot hello');

        assert.equal(image, null);
      });
    });
  });
});
