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
  document.getElementById('content').innerHTML = currentSlide;
});
ipcRenderer.on('up', function (event, arg) {
  console.log(arg);
  decreaseSlideNumber();
  document.getElementById('content').innerHTML = currentSlide;
});
ipcRenderer.on('update', function (event, arg) {
  content = arg;
  console.log(arg);
});