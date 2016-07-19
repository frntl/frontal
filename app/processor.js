'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = process;

var _slides = require('./slides');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function process(path) {
  var res = fs.readFileSync(path, 'utf8');
  if (res !== null) {
    var d = (0, _slides.slides)(res);
    return d;
  } else {
    throw Error('Could not convert slides');
  }
  // fs.readFile(path, 'utf8', (error, data) => {
  //   if (error) {
  //     console.error(`Error while reading file: ${path} || ${error}`);
  //     return null;
  //   } else {
  //     console.log('d ' , d);
  //   }
  // });
}