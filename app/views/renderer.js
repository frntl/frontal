'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = renderer;

var _require = require('electron');

var ipcRenderer = _require.ipcRenderer;

var content = null;
var currentSlide = 0;
function renderer() {}

function increaseSlideNumber() {
  currentSlide++;
}

function decreaseSlideNumber() {
  if (currentSlide === 0) {
    currentSlide = 0;
  } else {
    currentSlide--;
  }
}
ipcRenderer.on('down', function (event, arg) {
  console.log(arg);
  increaseSlideNumber();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('up', function (event, arg) {
  console.log(arg);
  decreaseSlideNumber();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('update', function (event, arg) {
  content = arg;
  console.log(arg);
});
ipcRenderer.on('slides', function (event, arg) {
  content = arg;
  console.log(content);
  var ids = ['comments', 'slides'];
  ids.forEach(function (ele, index, array) {
    var element = document.getElementById(ele);
    if (element !== null) {
      console.log('found ' + ele + ' div');
      if (ele === 'slides') {
        element.innerHTML = content.msg.slides[0];
      } else if (ele === 'comments') {
        element.innerHTML = content.msg.comments[0].comments;
      }
    }
  });
});