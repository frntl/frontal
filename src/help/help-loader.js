import {
  processing
} from '../lib/processor';
import {
  watch
} from '../lib/watcher';
import {
  detectTomlConfig
} from '../lib/files';

const windowManager = require('electron-window-manager');

function send(win, title, data) {
  // console.log(data);
  win.webContents.send(title, {
    msg: data
  });
}

function readHelpFile() {
  let tomlRes = detectTomlConfig(global.helpFilePath);
  let slidesHTML = processing(global.helpFilePath, tomlRes);
  if(process.env.NODE_ENV === 'development') {
    global.presentationFile = global.helpFilePath;
    watch(global.presentationFile);
  }
  return slidesHTML;
}
export function helpLoader(wins) {
  let slidesHTML = readHelpFile();
  wins.forEach((w, i, arr) => {
    send(w, 'slides', slidesHTML);
    // send(w, 'switch-theme', 'themes/default/');
  });
}
export function initialHelpLoader(wins) {
  let slidesHTML = readHelpFile();
  wins.forEach((w, i, arr) => {
    w.webContents.on('did-finish-load', () => {
      send(w, 'slides', slidesHTML);
      send(w, 'switch-theme', global.config.get('currentTheme'));
    });
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
  win.content().on('did-finish-load', ()=>{

    win.content().send('slides', {
      msg: slidesHTML
    });
    win.content().send('switch-theme', {
      msg: global.config.get('currentTheme')
    });
    // send(win, 'slides', slidesHTML);
    // send(win, 'switch-theme', global.config.get('currentTheme'));
  });
  // wins.forEach((w, i, arr) => {
  //   w.webContents.on('did-finish-load', () => {
  //   });
  // });
}
