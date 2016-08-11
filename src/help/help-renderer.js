const drag = require('electron-drag');
window.onload = () => {
  var clearB = drag('#header');
// Fallback to using -webkit-app-region property.
  if(!drag.supported) {
    document.querySelector('#header').style['-webkit-app-region'] = 'drag';
  }
};
