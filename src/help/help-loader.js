import {
  processing
} from '../lib/processor';
import {
  watch
} from '../lib/watcher';
import {
  detectTomlConfig
} from '../lib/files';

function send(win, title, data) {
  // console.log(data);
  win.webContents.send(title, {
    msg: data
  });
}

function readHelpFile() {
  global.presentationFile = global.helpFilePath;
  let tomlRes = detectTomlConfig(global.helpFilePath);
  let slidesHTML = processing(global.helpFilePath, tomlRes);
  watch(global.presentationFile);
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
