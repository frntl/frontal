const {ipcRenderer} = require('electron');
const isEmpty = require('lodash.isempty');
import {getComputedFontSize, setFontSize} from './lib/fontsize';
import {themeLoaderJS} from './lib/theme-loader';

var shell = require('electron').shell;

const drag = require('electron-drag');
window.onload = () => { // eslint-disable-line no-undef
  // const {
  //   webFrame
  // } = require('electron');
  // let zoomFactorSlides = 1;
  let initialCommentsFontsize = null;
  let initialSlidesFontsize = null;
  let initialSlidesHeaderFontsize = null;
  let initialSlidesFooterFontsize = null;
  if (document.getElementById('comments') !== null) {// eslint-disable-line no-undef
    initialCommentsFontsize = getComputedFontSize(document.getElementById('comments'));// eslint-disable-line no-undef
    // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
  }
  if (document.getElementById('frontal') !== null) {// eslint-disable-line no-undef
    initialSlidesFontsize = getComputedFontSize(document.getElementById('frontal'));// eslint-disable-line no-undef
    // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
  }
  if (document.getElementById('header') !== null) {// eslint-disable-line no-undef
    initialSlidesHeaderFontsize = getComputedFontSize(document.getElementById('header'));// eslint-disable-line no-undef
    // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
  }
  if (document.getElementById('footer') !== null) {// eslint-disable-line no-undef
    initialSlidesFooterFontsize = getComputedFontSize(document.getElementById('footer'));// eslint-disable-line no-undef
    // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
  }
  let content = null;
  let currentSlide = 0;
  let ids = ['comments', 'slides'];
  // console.log(webFrame);
  // Pass a query selector or a dom element to the function.
  // Dragging the element will drag the whole window.
  var clearF = drag('#frontal');
  var clearN = drag('#notes');
  // Call the returned function to make the element undraggable again.
  // clear();
  // Fallback to using -webkit-app-region property.
  if (!drag.supported) {
    document.querySelector('#frontal').style['-webkit-app-region'] = 'drag';// eslint-disable-line no-undef
    document.querySelector('#notes').style['-webkit-app-region'] = 'drag';// eslint-disable-line no-undef
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
    let curr = document.getElementById('slides-current');// eslint-disable-line no-undef
    if (curr !== null) {
      curr.innerHTML = currentSlide + 1;
    }
  }

  function setSlideslength(i) {
    let len = document.getElementById('slides-length');// eslint-disable-line no-undef
    if (len !== null) {
      len.innerHTML = i;
    }
  }

  function setHeaderFooter(html, name) {
    let elementsHTMLCollection = document.getElementsByTagName(name);// eslint-disable-line no-undef
    let elements = Array.from(elementsHTMLCollection);
    elements.forEach((ele, i, arr) => {
      ele.innerHTML = html;
    });
  }

  function setAttributes(attr) {
    // console.log(attr);
    if (isEmpty(attr) === true) {
      console.log('attributes are empty');
      setHeaderFooter('', 'footer');
      setHeaderFooter('', 'header');
      return;
    }
    if (attr !== null) {
      if (attr.hasOwnProperty('footer') === true) {
        setHeaderFooter(attr.footer, 'footer');
      }else {
        setHeaderFooter('', 'footer');

      }
      if (attr.hasOwnProperty('header') === true) {
        setHeaderFooter(attr.header, 'header');
      }else{
        setHeaderFooter('', 'header');

      }
    }
  }
  class Content {
    constructor(msg) {
      this.msg = msg;
    }
    getCurrentAttributes(i) {
      return this.msg[i].attributes;
    }
    getCurrentHTML(i) {
      return this.msg[i].slide;
    }
    getCurrentComment(i) {
      return this.msg[i].comments;
    }
  }

  function setContent() {
    let cnt = content.msg[constrain(currentSlide, content.msg)];
    // console.log(cnt);
    ids.forEach((ele, index, array) => {
      let element = document.getElementById(ele); // eslint-disable-line no-undef
      if (element !== null) {
        console.log(`found ${ele} div`);
        if (ele === 'slides') {
          element.innerHTML = cnt.slide;
          // console.log(content.msg[constrain(currentSlide, content.msg)].attributes);
          setAttributes(cnt.attributes);
          // if (cnt.attributes !== null) {
          //   if (cnt.attributes.hasOwnProperty('footer') === true) {
          //     setHeaderFooter(cnt.attributes.footer, 'footer');
          //   }
          //   if (cnt.attributes.hasOwnProperty('header') === true) {
          //     setHeaderFooter(cnt.attributes.header, 'header');
          //   }
          // } else {}
        } else if (ele === 'comments') {
          element.innerHTML = cnt.comments;
        }
      }
    });
  }

  function changeCSS(cssFilePath, cssLinkIndex) {
    let oldLink = document.getElementsByTagName('link').item(cssLinkIndex); // eslint-disable-line no-undef
    let newLink = document.createElement('link'); // eslint-disable-line no-undef
    newLink.setAttribute('rel', 'stylesheet');
    newLink.setAttribute('type', 'text/css');
    newLink.setAttribute('href', cssFilePath);
    document.getElementsByTagName('head').item(0).replaceChild(newLink, oldLink); // eslint-disable-line no-undef
  }
  // -----------execution-------------------
  ipcRenderer.on('new-file', (event, arg) => {
    // reset all on new file
    content = null;
    currentSlide = 0;
    setHeaderFooter('', 'footer');
    setHeaderFooter('', 'header');

  });
  ipcRenderer.on('down', (event, arg) => {
    // console.log(arg);
    console.log(content);
    increaseSlideNumber();
    setContent();
    setCurrentSlideNumber();
    // document.getElementByClassName('content')
    // .innerHTML = currentSlide;
  });
  ipcRenderer.on('up', (event, arg) => {
    console.log(content);
    decreaseSlideNumber();
    setContent();
    setCurrentSlideNumber();
    // document.getElementByClassName('content')
    // .innerHTML = currentSlide;
  });
  ipcRenderer.on('update', (event, arg) => {
    // content = arg;
    // console.log(arg);
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
    // console.log('hello');
  });
  ipcRenderer.on('switch-theme', (event, arg) => {
    console.log(arg);
    themeLoaderJS(__dirname + '/' + arg.msg.path + '/js');
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
    // console.log(arg);
    setFontSize(-2, null, 'comments');
  });
  ipcRenderer.on('dot', (event, arg) => {
    // increase speakerNotes
    // console.log(arg);
    setFontSize(2, null, 'comments');
  });
  ipcRenderer.on('zoom-reset-notes', (event, arg) => {
    // decrease speakerNotes
    // console.log(arg);
    setFontSize(null, initialCommentsFontsize, 'comments');
  });
};
