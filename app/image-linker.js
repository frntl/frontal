'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linker = linker;

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// - should take html or markdown as input
// - find <img src
// - if the link as a relativ link
// - use path.resolve to fix the link based on presentations location
var cheerio = require('cheerio');
function linker(data, rootPath) {
  var $ = cheerio.load(data);
  $('img').each(function (i, elem) {
    // do the replacing here
    var src = $(elem).attr('src');
    if (!src.startsWith('http')) {
      // console.log(src);
      var res = path.resolve(rootPath, src);
      // console.log(res);
      $(elem).attr('src', res);
    }
  });
  var fixedData = $.html();
  return fixedData;
}