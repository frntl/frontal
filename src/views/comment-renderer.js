const remote = require('electron').remote;
// const {ipcRenderer, remote} = require('electron');
const windowManager = remote.require('electron-window-manager');
const $ = require('jquery');
const drag = require('electron-drag');
window.onload = () => { // eslint-disable-line no-undef

  // var clearF = drag('#frontal');
  var clearN = drag('#notes');
  // function setCurrentSlideNumber(num) {
  //   let curr = document.getElementById('slides-current');// eslint-disable-line no-undef
  //   if (curr !== null) {
  //     curr.innerHTML = num;
  //   }
  // }

  // function setSlideslength(i) {
  //   let len = document.getElementById('slides-length');// eslint-disable-line no-undef
  //   if (len !== null) {
  //     len.innerHTML = i;
  //   }
  // }
  // Call the returned function to make the element undraggable again.
  // clear();
  // Fallback to using -webkit-app-region property.
  if (!drag.supported) {
    // document.querySelector('#frontal').style['-webkit-app-region'] = 'drag';// eslint-disable-line no-undef
    document.querySelector('#notes').style['-webkit-app-region'] = 'drag';// eslint-disable-line no-undef
  }

  windowManager.bridge.on('content', function(event) {
    console.log(event);
    $('#comments').html(event.message.comment);
    $('#slides-current').html(event.message.currentSlide);
    $('#slides-length').html(event.message.currentSlidesLength);
  });

};

