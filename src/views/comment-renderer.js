/* global window, document */
const remote = require('electron').remote;
// const {ipcRenderer, remote} = require('electron');
const windowManager = remote.require('electron-window-manager');
const $ = require('jquery');
const drag = require('electron-drag');
const padStart = require('lodash.padStart');
import {setFontSize, getComputedFontSize} from './lib/fontsize';

let initialCommentsFontsize = null;

function thumbs(number) {
  let rootPath = remote.getGlobal('presentationRoot');
  let name = remote.getGlobal('name');
  let prefix = remote.getGlobal('slidesPrefix');
  let thumbFolder = `${rootPath}/thumbs-${name}`;

  if(document.getElementById('thumbs') !== null) {

    let template = `<div class="thumbs" id="thumb-current">
    <img src="${thumbFolder}/${prefix}${padStart(number, 5, 0)}.png" >
    </div>
    <div class="thumbs" id="thumb-next">
    <img src="${thumbFolder}/${prefix}${padStart(number + 1, 5, 0)}.png" >
    </div>
    <div style="clear:both;"/>`;

    document.getElementById('thumbs').innerHTML = template;
  }
}

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

  // windowManager.bridge.on('slide-change', (event)=>{
  //   console.log(event);
  // });

  windowManager.bridge.on('dot', (event)=>{
    setFontSize(event.message.val, null, 'comments');

  });
  windowManager.bridge.on('zoom-reset-notes', (event)=> {
    setFontSize(null, initialCommentsFontsize, 'comments');
  });

  windowManager.bridge.on('content', (event) => {
    console.log(event);
    $('#comments').html(event.message.comment);
    $('#slides-current').html(event.message.currentSlide);
    $('#slides-length').html(event.message.currentSlidesLength);
    thumbs(parseInt(event.message.currentSlide, 10) - 1);
  });

};

