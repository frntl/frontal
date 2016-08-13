const $ = require('jquery');

export function switchJS (themePath) {
  var libs = require('require-all')(themePath);
  $('#slides').unbind('DOMSubtreeModified'); // unbind everything

  for (var key in libs) {
    if (key in libs) {
      $('#slides').bind('DOMSubtreeModified', (libs[key].default));
      libs[key].default();
    }
  }
}

