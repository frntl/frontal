// Copyright (c) 2010-2015 Giulia Alfonsi <electric.g@gmail.com>
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//  Simple example of using private variables
//
//  To start the stopwatch:
//    obj.start();
//
//  To get the duration in milliseconds without pausing / resuming:
//    var x = obj.time();
//
//  To pause the stopwatch:
//    var x = obj.stop(); // Result is duration in milliseconds
//
//  To resume a paused stopwatch
//    var x = obj.start();  // Result is duration in milliseconds
//
//  To reset a paused stopwatch
//    obj.stop();
//
//
const $ = require('jquery');

let ClsStopwatch = function() {
  // Private vars
  var startAt = 0; // Time of last start / resume. (0 if not running)
  var lapTime = 0; // Time on the clock when last stopped in milliseconds
  var now = function() {
    return (new Date()).getTime();
  };
  // Public methods
  // Start or resume
  this.start = function() {
    startAt = startAt ? startAt : now();
  };
  // Stop or pause
  this.stop = function() {
    // If running, update elapsed time otherwise keep it
    lapTime = startAt ? lapTime + now() - startAt : lapTime;
    startAt = 0; // Paused
  };
  // Reset
  this.reset = function() {
    lapTime = startAt = 0;
  };
  // Duration
  this.time = function() {
    return lapTime + (startAt ? now() - startAt : 0);
  };
};
let x = new ClsStopwatch();
let $time;
let clocktimer;
let duration = null;
let over = false;
let once = false;

function pad(num, size) {
  var s = '0000' + num;
  return s.substr(s.length - size);
}

function formatTime(time) {
  let h = 0;
  let m = 0;
  let s = 0;
  let ms = 0;
  var newTime = '';
  h = Math.floor(time / (60 * 60 * 1000));
  time = time % (60 * 60 * 1000);
  m = Math.floor(time / (60 * 1000));
  time = time % (60 * 1000);
  s = Math.floor(time / 1000);
  // ms = time % 1000;

  newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
  // console.log('minute: ' + m);
  if(m >= duration && once === false) {
    // console.log('we are over time');
    over = true;
  }
  return newTime;
}


function update() {
  $time = document.getElementById('time-running');
  $time.innerHTML = formatTime(x.time());
  if(over === true && once === false) {
    once = true;
  let dur = document.getElementById('time-running');
  dur.className += 'blink';

  }
}
// function show() {
//   update();
// }

function getDuration (){
  duration = parseFloat(document.getElementById('duration').value);
  console.log(`duration is:${duration}`);

}
export function start() {
  clocktimer = setInterval(update, 1);
  x.start();
  getDuration();
}
// export function overtime() {
//   return over;
// }
export function stop() {
  x.stop();
  clearInterval(clocktimer);
  $('#time-running').removeClass('blink');

}
export function reset() {
  stop();
  x.reset();
  update();
  over = false;
  once = true;
  $('#time-running').removeClass('blink');

}


