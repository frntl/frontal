/* global window, document*/
const {ipcRenderer} = require('electron');
const remote = require('electron').remote;

const isEmpty = require('lodash.isempty');
import {getComputedFontSize, setFontSize} from './lib/fontsize';
import {switchToBuildInJS} from './lib/theme-loader';
import {setAttributes, setHeaderFooter} from './lib/header-footer';
const windowManager = remote.require('electron-window-manager');
const shell = require('electron').shell;
const padStart = require('lodash.padStart');
const drag = require('electron-drag');

window.onload = () => {

  let content = null;
  let currentSlide = 0;
  let ids = ['comments', 'slides'];
  // let initialCommentsFontsize = null;
  let initialSlidesFontsize = null;
  let initialSlidesHeaderFontsize = null;
  let initialSlidesFooterFontsize = null;

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
  // Pass a query selector or a dom element to the function.
  // Dragging the element will drag the whole window.
  var clearF = drag('#frontal');
  // Call the returned function to make the element undraggable again.
  // clear();
  // Fallback to using -webkit-app-region property.
  if (!drag.supported) {
    document.querySelector('#frontal').style['-webkit-app-region'] = 'drag';
    document.querySelector('#notes').style['-webkit-app-region'] = 'drag';
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

  // function setCurrentSlideNumber() {
  //   let curr = document.getElementById('slides-current');
  //   if (curr !== null) {
  //     curr.innerHTML = currentSlide + 1;
  //   }
  // }

  // function setSlideslength(i) {
  //   let len = document.getElementById('slides-length');
  //   if (len !== null) {
  //     len.innerHTML = i;
  //   }
  // }

  // function setHeaderFooter(html, name) {
  //   let elementsHTMLCollection = document.getElementsByTagName(name);
  //   let elements = Array.from(elementsHTMLCollection);
  //   elements.forEach((ele, i, arr) => {
  //     ele.innerHTML = html;
  //   });
  // }

  // function setAttributes(attr) {
  //   // console.log(attr);
  //   if (isEmpty(attr) === true) {
  //     console.log('attributes are empty');
  //     setHeaderFooter('', 'footer');
  //     setHeaderFooter('', 'header');
  //     return;
  //   }
  //   if (attr !== null) {
  //     if ('footer' in attr) {
  //       setHeaderFooter(attr.footer, 'footer');
  //     }else {
  //       setHeaderFooter('', 'footer');

  //     }
  //     if ('header' in attr) {
  //       setHeaderFooter(attr.header, 'header');
  //     }else{
  //       setHeaderFooter('', 'header');

  //     }
  //   }
  // }
  function setContent() {
    let cnt = content.msg[constrain(currentSlide, content.msg)];
    // console.log(cnt);
    ids.forEach((ele, index, array) => {
      let element = document.getElementById(ele);
      if (element !== null) {
        console.log(`found ${ele} div`);
        if (ele === 'slides') {
          element.innerHTML = cnt.slide;
          setAttributes(cnt.attributes);
          windowManager.bridge.emit('content', {
            message: {comment: cnt.comments,
                      currentSlide: padStart(currentSlide + 1, String(content.msg.length).length, '0'),
                        currentSlidesLength: content.msg.length}
          });
        }
        //  else if (ele === 'comments') {
        //   element.innerHTML = cnt.comments;
        // }
      }
    });
  }

  function switchCSS(cssFilePath, cssLinkIndex) {

    let oldLink = document.getElementsByTagName('link').item(cssLinkIndex);
    let newLink = document.createElement('link');
    newLink.setAttribute('rel', 'stylesheet');
    newLink.setAttribute('type', 'text/css');
    if(oldLink.id === 'slides-link') {
      newLink.setAttribute('id', 'slides-link');
      newLink.setAttribute('href', cssFilePath + 'main.css');

    }else if(oldLink.id === 'comments-link') {
      newLink.setAttribute('id', 'comments-link');
      newLink.setAttribute('href', cssFilePath + 'main-comments.css');
    }
    document.getElementsByTagName('head').item(0).replaceChild(newLink, oldLink);
  }

  function switchToBuildInCSS(themeName) {
    let cssFilePath = __dirname + '/themes/' + themeName + '/css/';
    switchCSS(cssFilePath, 0);
  }

  function switchToCustomCSS(filePath) {
    switchCSS(filePath, 0);
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
    // setCurrentSlideNumber();
    // document.getElementByClassName('content')
    // .innerHTML = currentSlide;
  });
  ipcRenderer.on('up', (event, arg) => {
    console.log(content);
    decreaseSlideNumber();
    setContent();
    // setCurrentSlideNumber();
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
    // setCurrentSlideNumber();
    // setSlideslength(content.msg.length);
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
    console.log('switch', arg.msg);
    switchToBuildInCSS(arg.msg, 0);
    let jsFolderPath = __dirname + '/themes/' + arg.msg + '/js/';
    switchToBuildInJS(jsFolderPath);
  });

  ipcRenderer.on('switch-custom-theme', (event, arg) =>{
    console.log('switch to custom theme: ', arg);
    if(arg.msg.css.slidesTheme === true) {
      switchToCustomCSS(arg.msg.css.path + '/');
    }
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
    windowManager.bridge.emit('comma', {
      message: {val: -2}
    });
    // setFontSize(-2, null, 'comments');
  });
  ipcRenderer.on('dot', (event, arg) => {
    // increase speakerNotes
    // console.log(arg);
    windowManager.bridge.emit('dot', {
      message: {val: 2}
    });
    // setFontSize(2, null, 'comments');
  });
  ipcRenderer.on('zoom-reset-notes', (event, arg) => {
    // decrease speakerNotes
    // console.log(arg);
    windowManager.bridge.emit('zoom-reset-notes', {
      message: {val: null}
    });
    // setFontSize(null, initialCommentsFontsize, 'comments');
  });
};
