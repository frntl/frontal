'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hrefer = hrefer;
var cheerio = require('cheerio');
function hrefer(data) {
  var $ = cheerio.load(data);
  $('a').each(function (i, elem) {
    var url = $(elem).attr('href');
    $(elem).attr('onclick', 'require(\'electron\').remote.shell.openExternal("' + url + '")');
    $(elem).attr('href', '#');
  });
  var fixedData = $.html();
  return fixedData;
}