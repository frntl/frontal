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
var shell = require('electron').shell;
// open links externally by default
// let links = document.getElementsByTagName('a'); // eslint-disable-line no-undef
// console.log(links);

// if (document.readyState != "complete") {
//   document.addEventListener('DOMContentLoaded', function() {
//     prepareTags()
//   }, false);
// } else {
//   prepareTags();
// }

// function prepareTags(){
//   aTags = document.getElementsByTagName("a");
//   for (var i = 0; i < aTags.length; i++) {
//     aTags[i].setAttribute("onclick","require('shell').openExternal('" + aTags[i].href + "')");
//     aTags[i].href = "#";
//   }
//   return false;
// }

// Array.from(document.getElementsByTagName('a')).forEach((ele, i, arr) => {
//   ele.onclick(function(event) {
//     event.preventDefault();
//     shell.openExternal(this.href);
//   });
// });
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
        element.innerHTML = content.msg[constrain(currentSlide, content.msg)].slide;
      } else if (ele === 'comments') {
        element.innerHTML = content.msg[constrain(currentSlide, content.msg)].comments;
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
ipcRenderer.on('switch-theme', function (event, arg) {
  console.log(arg);
});

function changeCSS(cssFilePath, cssLinkIndex) {
  var oldLink = document.getElementsByTagName('link').item(cssLinkIndex); // eslint-disable-line no-undef
  var newLink = document.createElement('link'); // eslint-disable-line no-undef
  newLink.setAttribute('rel', 'stylesheet');
  newLink.setAttribute('type', 'text/css');
  newLink.setAttribute('href', cssFilePath);
  document.getElementsByTagName('head').item(0).replaceChild(newLink, oldLink); // eslint-disable-line no-undef
}