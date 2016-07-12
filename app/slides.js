'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slides = slides;

var _parser = require('./parser');

var parser = _interopRequireWildcard(_parser);

var _comments = require('./comments');

var comments = _interopRequireWildcard(_comments);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function slides(data) {
  var slds = parser.md2html(data);
  var cmts = comments.get(slds);
  return {
    slides: slds,
    comments: cmts
  };
}