const {
  ipcRenderer
} = require('electron');
const {webFrame} = require('electron');
let zoomFactorSlides = 1;
let content = null;
let currentSlide = 0;
let ids = ['comments', 'slides'];
var shell = require('electron')
  .shell;
const drag = require('electron-drag');

// Pass a query selector or a dom element to the function.
// Dragging the element will drag the whole window.
var clearF = drag('#frontal');
var clearN = drag('#notes');

// Call the returned function to make the element undraggable again.
// clear();
// Fallback to using -webkit-app-region property.
if(!drag.supported) {
    document.querySelector('#frontal').style['-webkit-app-region'] = 'drag';
}

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
export function renderer() {}

function increaseSlideNumber() {
  if (content !== null || content.msg !== undefined) {
    if (currentSlide === content.msg.length - 1) {
      currentSlide = content.msg.length - 1;
    } else {
      currentSlide++;
    }
  }
}

function decreaseSlideNumber() {
  if (currentSlide === 0) {
    currentSlide = 0;
  } else {
    currentSlide--;
  }
}

function constrain(i, arr) {
  let ndx = null;
  if (i > arr.length - 1) {
    ndx = arr.length - 1;
  } else {
    ndx = i;
  }
  return ndx;
}

function setCurrentSlideNumber() {
  let curr = document.getElementById('slides-current');
  if (curr !== null) {
    curr.innerHTML = currentSlide + 1;
  }
}

function setSlideslength(i) {
  let len = document.getElementById('slides-length');
  if (len !== null) {
    len.innerHTML = i;
  }
}

function setContent() {
  ids.forEach((ele, index, array) => {
    let element = document.getElementById(ele); // eslint-disable-line no-undef
    if (element !== null) {
      console.log(`found ${ele} div`);
      if (ele === 'slides') {
        element.innerHTML = content.msg[constrain(currentSlide, content.msg)].slide;
      } else if (ele === 'comments') {
        element.innerHTML = content.msg[constrain(currentSlide, content.msg)].comments;
      }
    }
  });
}
ipcRenderer.on('down', (event, arg) => {
  console.log(arg);
  increaseSlideNumber();
  setContent();
  setCurrentSlideNumber();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('up', (event, arg) => {
  console.log(arg);
  decreaseSlideNumber();
  setContent();
  setCurrentSlideNumber();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('update', (event, arg) => {
  content = arg;
  console.log(arg);
});
ipcRenderer.on('slides', (event, arg) => {
  console.log(arg);
  content = arg;
  setContent();
  setCurrentSlideNumber();
  setSlideslength(content.msg.length);
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
ipcRenderer.on('hello', (event, arg) => {
  console.log('hello');
});
ipcRenderer.on('switch-theme', (event, arg) => {
  console.log(arg);
});

ipcRenderer.on('plus', (event, arg)=>{
  console.log(arg);
  zoomFactorSlides += 0.1;
  webFrame.setZoomFactor(zoomFactorSlides);

});
ipcRenderer.on('minus', (event, arg)=>{
  console.log(arg);
  zoomFactorSlides -= 0.1;
  webFrame.setZoomFactor(zoomFactorSlides);

});
ipcRenderer.on('zoom-reset', (event, arg)=>{
  console.log(arg);
  zoomFactorSlides = 1;
  webFrame.setZoomFactor(zoomFactorSlides);

});
function changeCSS(cssFilePath, cssLinkIndex) {
  let oldLink = document.getElementsByTagName('link')
    .item(cssLinkIndex); // eslint-disable-line no-undef
  let newLink = document.createElement('link'); // eslint-disable-line no-undef
  newLink.setAttribute('rel', 'stylesheet');
  newLink.setAttribute('type', 'text/css');
  newLink.setAttribute('href', cssFilePath);
  document.getElementsByTagName('head')
    .item(0)
    .replaceChild(newLink, oldLink); // eslint-disable-line no-undef
}
