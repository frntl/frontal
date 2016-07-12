'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comments = comments;
exports.get = get;
var regex = new RegExp('(&lt;!--(.*?)--&gt;)', 'gm');
function comments() {}

function get(slides) {
  var comments = [];
  var cnt = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = slides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var s = _step.value;

      // console.log(`slide ${cnt}`);
      // console.log(s);
      var res = s.match(regex);
      comments.push({ 'slide': cnt, 'comments': res });
      cnt++;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var i = 0; i < comments.length; i++) {
    if (comments[i].comments === null) {
      comments[i].comments = [''];
      continue;
    }
    for (var j = 0; j < comments[i].comments.length; j++) {
      comments[i].comments[j] = clean(comments[i].comments[j]);
    }
  }
  // console.log(comments);
  return comments;
}

function clean(str) {
  str = str.replace(/&lt;!--/g, '');
  str = str.replace(/--&lt;/g, ''); // why does this not match???
  return str.trim();
}