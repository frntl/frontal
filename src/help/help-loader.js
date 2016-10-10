import {
  processing
} from '../lib/processor';
import {
  watch
} from '../lib/watcher';
import {
  detectTomlConfig
} from '../lib/files';

import {resolve, basename, extname} from 'path';

const windowManager = require('electron-window-manager');

function send(win, title, data) {
  // console.log(data);
  win.webContents.send(title, {
    msg: data
  });
}

function readHelpFile() {
  global.name = basename(global.helpFilePath, extname(global.helpFilePath));
  let tomlRes = detectTomlConfig(global.helpFilePath);
  let slidesHTML = processing(global.helpFilePath, tomlRes);
  if(global.isDev) {
    global.presentationFile = global.helpFilePath;
    watch(global.presentationFile);
  }
  return slidesHTML;
}
export function helpLoader() {
  let win = windowManager.get('intro');
  console.log('in help loader', win);
  let slidesHTML = readHelpFile();
  if(win === false) {
    let filePath = resolve(__dirname, '../views/slides.html');
    win = windowManager.createNew('intro', 'Intro', `file://${filePath}`, 'slides');
    win.open();
    waitForWindow(win, slidesHTML);
  } else {
    sendManaged(win, slidesHTML);
  }
  //   win.content().on('did-finish-load', ()=>{

  //   win.content().send('slides', {
  //     msg: slidesHTML
  //   });
  //   win.content().send('switch-theme', {
  //     msg: global.config.get('currentTheme')
  //   });
  // }
  // wins.forEach((w, i, arr) => {
  //   send(w, 'slides', slidesHTML);
  //   // send(w, 'switch-theme', 'themes/default/');
  // });
}


// export function initialHelpLoader(wins) {
//   let slidesHTML = readHelpFile();
//   wins.forEach((w, i, arr) => {
//     w.webContents.on('did-finish-load', () => {
//       send(w, 'slides', slidesHTML);
//       send(w, 'switch-theme', global.config.get('currentTheme'));
//     });
//   });
// }

function sendManaged(win, slidesHTML) {
  win.content().send('slides', {
    msg: slidesHTML
  });
  if(global.config.get('currentTheme') === 'custom') {
    global.config.set('currentTheme', 'default');
  }
  win.content().send('switch-theme', {
    msg: global.config.get('currentTheme')
  });
}

function waitForWindow(win, slidesHTML) {
  win.content().on('did-finish-load', ()=>{
    sendManaged(win, slidesHTML);
    // win.content().send('slides', {
    //   msg: slidesHTML
    // });
    // win.content().send('switch-theme', {
    //   msg: global.config.get('currentTheme')
    // });
    // send(win, 'slides', slidesHTML);
    // send(win, 'switch-theme', global.config.get('currentTheme'));
  });
}
export function initialHelpLoaderManaged() {
  if(global.config.get('showIntroOnStratup') === false) {
    return;
  }
  let win = windowManager.get('intro');
  // console.log(win);
  let slidesHTML = readHelpFile();
  win.show = true;
  waitForWindow(win, slidesHTML);

  // win.content().on('did-finish-load', ()=>{

  //   win.content().send('slides', {
  //     msg: slidesHTML
  //   });
  //   win.content().send('switch-theme', {
  //     msg: global.config.get('currentTheme')
  //   });
  //   // send(win, 'slides', slidesHTML);
  //   // send(win, 'switch-theme', global.config.get('currentTheme'));
  // });
  // wins.forEach((w, i, arr) => {
  //   w.webContents.on('did-finish-load', () => {
  //   });
  // });
}
