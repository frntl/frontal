const $ = require('jquery');

export function switchToBuildInJS (themePath) {
  console.log(themePath);

  var libs = require('require-all')(themePath);
    // $('#slides').bind('DOMSubtreeModified', imagesLeft);
  for (var key in libs) {
    if (key in libs) {
    // console.log(libs);
      $('#slides').bind('DOMSubtreeModified', (libs[key].default));
      libs[key].default();
    }
  }
}
