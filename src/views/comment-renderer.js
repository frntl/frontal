/* global window, document */
const remote = require('electron').remote;
// const {ipcRenderer, remote} = require('electron');
const windowManager = remote.require('electron-window-manager');
const $ = require('jquery');
const drag = require('electron-drag');
import {setFontSize, getComputedFontSize} from './lib/fontsize';
let initialCommentsFontsize = null;

window.onload = () => {
  if (document.getElementById('comments') !== null) {
    initialCommentsFontsize = getComputedFontSize(document.getElementById('comments'));
    // console.log('initialCommentsFontsize ' , initialCommentsFontsize);
  }
  // var clearF = drag('#frontal');
  var clearN = drag('#notes');

  // Call the returned function to make the element undraggable again.
  // clear();
  // Fallback to using -webkit-app-region property.
  if (!drag.supported) {
    // document.querySelector('#frontal').style['-webkit-app-region'] = 'drag';// eslint-disable-line no-undef
    document.querySelector('#notes').style['-webkit-app-region'] = 'drag';// eslint-disable-line no-undef
  }

  windowManager.bridge.on('comma', (event)=>{
    setFontSize(event.message.val, null, 'comments');

  });

  windowManager.bridge.on('dot', (event)=>{
    setFontSize(event.message.val, null, 'comments');

  });
  windowManager.bridge.on('zoom-reset-notes', (event)=>{
    setFontSize(null, initialCommentsFontsize, 'comments');
  });

  windowManager.bridge.on('content', function(event) {
    console.log(event);
    $('#comments').html(event.message.comment);
    $('#slides-current').html(event.message.currentSlide);
    $('#slides-length').html(event.message.currentSlidesLength);
  });

};

