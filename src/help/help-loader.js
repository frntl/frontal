import {
  processing
} from '../processor';
import {
  watch
} from '../utils/watcher';

function send(w, slds) {
  // console.log(slds);
  w.webContents.send('slides', {
    msg: slds
  });
}

function readHelpFile() {
  global.presentationFile = global.helpFilePath;
  let slidesHTML = processing(global.helpFilePath);
  watch(global.presentationFile);
  return slidesHTML;
}
export function helpLoader(wins) {
  let slidesHTML = readHelpFile();
  wins.forEach((w, i, arr) => {
    send(w, slidesHTML);
  });
}
export function initialHelpLoader(wins) {
  let slidesHTML = readHelpFile();
  wins.forEach((w, i, arr) => {
    w.webContents.on('did-finish-load', () => {
      send(w, slidesHTML);
    });
  });
}
