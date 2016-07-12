'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processor = processor;

var _slides = require('./slides');

var slides = _interopRequireWildcard(_slides);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function processor(path) {
  fs.readFile(path, 'utf8', function (error, data) {
    if (error) {
      console.error('Error while reading file: ' + path + ' || ' + error);
      return null;
    } else {
      return slides(data);
    }
  });
}