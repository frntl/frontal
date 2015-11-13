'use strict';

var _parser = require('./parser');

var parser = _interopRequireWildcard(_parser);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _markdown = require('markdown');

var md = _interopRequireWildcard(_markdown);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var res = parser.json('{"one":"two"}');

// test the md2json parsing
/**
 * This file is just for testing the functions
 *
 */
fs.readFile('./../../examples/presentation.md', 'utf8', function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('md2json parsing test\n');
    var slides = parser.md2json(data);
    for (var i = 0; i < slides.length; i++) {
      console.log(slides[i][0]);
    }
    // console.log(`we found ${slides.length} slides` );
  }
});

// test the md2html parsing
fs.readFile('./../../examples/presentation.md', 'utf8', function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('md2html parsing test\n');
    var slides = parser.md2html(data);
    console.log('we have ' + slides.length + ' slides');
    for (var i = 0; i < slides.length; i++) {
      console.log(slides[i]);
    }
    console.log('we found ' + slides.length + ' slides');
  }
});