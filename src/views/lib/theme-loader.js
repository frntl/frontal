const $ = require('jquery');

export function themeLoaderJS (themePath) {
  var libs = require('require-all')(themePath);
// console.log(libs);
    // $('#slides').bind('DOMSubtreeModified', imagesLeft);
  for (var key in libs) {
    if (key in libs) {
    // console.log(libs);
      $('#slides').bind('DOMSubtreeModified', (libs[key].default));
    }
  }
}
