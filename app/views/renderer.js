'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = renderer;

var _require = require('electron');

var ipcRenderer = _require.ipcRenderer;

var content = null;
var currentSlide = 0;
var ids = ['comments', 'slides'];
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
function constrain(i, arr) {
  var ndx = null;
  if (i > arr.length - 1) {
    ndx = arr.length - 1;
  } else {
    ndx = i;
  }
  return ndx;
}

function setContent() {

  ids.forEach(function (ele, index, array) {
    var element = document.getElementById(ele); // eslint-disable-line no-undef
    if (element !== null) {
      console.log('found ' + ele + ' div');
      if (ele === 'slides') {
        element.innerHTML = content.msg.slides[constrain(currentSlide, content.msg.slides)];
      } else if (ele === 'comments') {
        element.innerHTML = content.msg.comments[constrain(currentSlide, content.msg.comments)].comments;
      }
    }
  });
}

ipcRenderer.on('down', function (event, arg) {
  console.log(arg);
  increaseSlideNumber();
  setContent();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('up', function (event, arg) {
  console.log(arg);
  decreaseSlideNumber();
  setContent();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('update', function (event, arg) {
  content = arg;
  console.log(arg);
});
ipcRenderer.on('slides', function (event, arg) {
  console.log(arg);
  content = arg;
  setContent();
  // ids.forEach((ele, index, array) => {
  //   let element = document.getElementById(ele);
  //   if (element !== null) {
  //     console.log(`found ${ele} div`);
  //     if (ele === 'slides') {
  //       element.innerHTML = content.msg.slides[constrain(currentSlide, content.msg.slides)];
  //     } else if (ele === 'comments') {
  //       element.innerHTML = content.msg.comments[constrain(currentSlide, content.msg.comments)].comments;
  //     }
  //   }
  // });
});