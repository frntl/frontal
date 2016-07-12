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

var removeHtmlComments = require('remove-html-comments');
function slides(data) {
  var slds = parser.md2html(data);
  for (var i = 0; i < slds.length; i++) {
    slds[i] = removeHtmlComments(slds[i]).data;
    console.log(slds[i]);
  }
  // console.log('slds ' , slds);
  var cmts = comments.get(slds);
  // console.log('cmts ' , cmts);
  return {
    slides: slds,
    comments: cmts
  };
}