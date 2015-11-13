'use strict';

var _parser = require('./parser');

var parser = _interopRequireWildcard(_parser);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _markdown = require('markdown');

var md = _interopRequireWildcard(_markdown);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// let res = parser.md("## test");
// let res = parser.json('{"one":"two"}');
fs.readFile('./../../examples/presentation.md', 'utf8', function (err, data) {
  if (err) {
    console.error(err);
  } else {
    var slides = parser.md2json(data);
    for (var i = 0; i < slides.length; i++) {
      console.log(slides[i][0]);
    }
    // let slides = parser.md(data);
    // console.log(`we found ${slides.length} slides` );
  }
}); /**
     * This file is just for testing the functions
     *
     */