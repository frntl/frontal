

// some slide specific functions
// this file should
// - require all files in theme/js
// and execute them
// the js file can export one default function so we only have to execute on thing

var libs = require('require-all')(__dirname + '/themes/default/js');
const $ = require('jquery');
// console.log(libs);
    // $('#slides').bind('DOMSubtreeModified', imagesLeft);
for (var key in libs) {
  if (key in libs) {
    // console.log(libs);
    $('#slides').bind('DOMSubtreeModified', (libs[key].default));
  }
}

