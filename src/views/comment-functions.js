import {
  start,
  stop,
  reset
} from './utils/stopwatch';
const remote = require('electron').remote;
let slidesWindow = remote.getGlobal('slidesWindow');

function setButtons() {
  let buttonids = ['start', 'stop', 'reset'];
  buttonids.forEach((ele, i, arr) => {
    let button = document.getElementById(ele);
    if (button !== null) {
      if (ele === 'start') {
        button.onclick = start;
        button.addEventListener('click', (e) => {
          if(!slidesWindow.isFullScreen()) {
          // if (!slidesWindow.isMaximized()) {
            // slidesWindow.maximize();
            slidesWindow.setFullScreen(true);
          }
        });
      }
      if (ele === 'stop') {
        button.onclick = stop;
      }
      if (ele === 'reset') {
        button.onclick = reset;
      }
    }
  });
}

function clock() {
  setInterval(function() {
    document.getElementById("time-clock").innerHTML = (new Date()).toLocaleTimeString();
  }, 1000);
}

// function getOvertime() {
//   setInterval(() => {
//     console.log(overtime());
//     if (overtime() === true) {
//       let dur = document.getElementById('time-running');
//       dur.className += 'blink';
//     }
//   }, 60000);
// }
// -------execution--------
//
clock();
setButtons();
// getOvertime();
