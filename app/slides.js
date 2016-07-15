'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slides = slides;

var _parser = require('./parser');

var parser = _interopRequireWildcard(_parser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import * as comments from './comments';
var removeHtmlComments = require('remove-html-comments');
var entities = require('entities');
var chalk = require('chalk');

function slides(data) {
  var slds = parser.md2html(data);
  // let cleanslds = [];
  // let cmts = [];
  var objs = [];
  for (var i = 0; i < slds.length; i++) {
    var clean = removeHtmlComments(entities.decodeHTML(slds[i]));
    // cleanslds[i] = clean.data;
    // console.log('removing comments');
    // console.log(chalk.red('slides.js Cleaned HTML: ') + JSON.stringify(clean, null, 2));
    // cmts.push({slideNumber: i, comments: clean.comments.join('\n')});
    var uncommented = [];
    for (var j = 0; j < clean.comments.length; j++) {
      uncommented.push(uncomment(clean.comments[j]));
    }
    objs.push({ slide: clean.data, comments: uncommented.join('<br><br>') });
  }
  // console.log('slds ' , slds);
  // let cmts = comments.get(slds);
  // console.log('cmts ' , cmts);
  return objs;
}

function uncomment(str) {
  var regex = /(<!--)([\s\S]*?)(-->)/g;
  var res = regex.exec(str);
  var cleaned = '';
  if (res !== null) {
    cleaned = res[2];
  }
  return cleaned;
}