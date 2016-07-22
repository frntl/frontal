const {
  ipcRenderer
} = require('electron');
// const {
//   webFrame
// } = require('electron');
// let zoomFactorSlides = 1;
let initialCommentsFontsize = null;
let initialSlidesFontsize = null;
let initialSlidesHeaderFontsize = null;
let initialSlidesFooterFontsize = null;

if (document.getElementById('comments') !== null) {
  initialCommentsFontsize = getComputedFontSize(document.getElementById('comments'));
  // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
}
if (document.getElementById('frontal') !== null) {
  initialSlidesFontsize = getComputedFontSize(document.getElementById('frontal'));
  // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
}
if (document.getElementById('header') !== null) {
  initialSlidesHeaderFontsize = getComputedFontSize(document.getElementById('header'));
  // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
}
if (document.getElementById('footer') !== null) {
  initialSlidesFooterFontsize = getComputedFontSize(document.getElementById('footer'));
  // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
}

let content = null;
let currentSlide = 0;
let ids = ['comments', 'slides'];
var shell = require('electron').shell;
const drag = require('electron-drag');
// console.log(webFrame);
// Pass a query selector or a dom element to the function.
// Dragging the element will drag the whole window.
var clearF = drag('#frontal');
var clearN = drag('#notes');
// Call the returned function to make the element undraggable again.
// clear();
// Fallback to using -webkit-app-region property.
if (!drag.supported) {
  document.querySelector('#frontal').style['-webkit-app-region'] = 'drag';
}
export function renderer() {}

function getComputedFontSize(ele) {
  let style = window.getComputedStyle(ele, null).getPropertyValue('font-size');
  let fontSize = parseFloat(style);
  return fontSize;
}

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

function setHeaderFooter(html, name) {
  let elementsHTMLCollection = document.getElementsByTagName(name);
  let elements = Array.from(elementsHTMLCollection);
  elements.forEach((ele, i, arr) => {
    ele.innerHTML = html;
  });
}

function setContent() {
  let cnt = content.msg[constrain(currentSlide, content.msg)];
  ids.forEach((ele, index, array) => {
    let element = document.getElementById(ele); // eslint-disable-line no-undef
    if (element !== null) {
      console.log(`found ${ele} div`);
      if (ele === 'slides') {
        element.innerHTML = cnt.slide;
        if (cnt.attributes !== null) {
          if (cnt.attributes.hasOwnProperty('footer') === true) {
            setHeaderFooter(cnt.attributes.footer, 'footer');
          }
          if (cnt.attributes.hasOwnProperty('header') === true) {
            setHeaderFooter(cnt.attributes.header, 'header');
          }
        }
      } else if (ele === 'comments') {
        element.innerHTML = cnt.comments;
      }
    }
  });
}

function setFontSize(val, initVal, name) {
  let element = document.getElementById(name);
  if (element !== null) {
    // console.log(element);
    console.log('font size: ', getComputedFontSize(element));
    let currentFontSize = getComputedFontSize(element);
    element.style.fontSize = initVal === null ? (currentFontSize + val) + 'px' : initVal + 'px';
  }
}

function changeCSS(cssFilePath, cssLinkIndex) {
  let oldLink = document.getElementsByTagName('link').item(cssLinkIndex); // eslint-disable-line no-undef
  let newLink = document.createElement('link'); // eslint-disable-line no-undef
  newLink.setAttribute('rel', 'stylesheet');
  newLink.setAttribute('type', 'text/css');
  newLink.setAttribute('href', cssFilePath);
  document.getElementsByTagName('head').item(0).replaceChild(newLink, oldLink); // eslint-disable-line no-undef
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
ipcRenderer.on('plus', (event, arg) => {
  // console.log(arg);
  // zoomFactorSlides += 0.1;
  // webFrame.setZoomFactor(zoomFactorSlides);
  setFontSize(2, null, 'frontal');
  setFontSize(2, null, 'header');
  setFontSize(2, null, 'footer');
});
ipcRenderer.on('minus', (event, arg) => {
  // console.log(arg);
  // zoomFactorSlides -= 0.1;
  // webFrame.setZoomFactor(zoomFactorSlides);
  setFontSize(-2, null, 'frontal');
  setFontSize(-2, null, 'header');
  setFontSize(-2, null, 'footer');
});
ipcRenderer.on('zoom-reset', (event, arg) => {
  // console.log(arg);
  // zoomFactorSlides = 1;
  // webFrame.setZoomFactor(zoomFactorSlides);
  setFontSize(null, initialSlidesFontsize, 'frontal');
  setFontSize(null, initialSlidesHeaderFontsize, 'header');
  setFontSize(null, initialSlidesFooterFontsize, 'footer');
});
ipcRenderer.on('comma', (event, arg) => {
  // decrease speakerNotes
  console.log(arg);
  setFontSize(-2, null, 'comments');
});
ipcRenderer.on('dot', (event, arg) => {
  // increase speakerNotes
  console.log(arg);
  setFontSize(2, null, 'comments');
});
ipcRenderer.on('zoom-reset-notes', (event, arg) => {
  // decrease speakerNotes
  console.log(arg);
  setFontSize(null, initialCommentsFontsize, 'comments');
});
