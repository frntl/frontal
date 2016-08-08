const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
import {
  processing
} from './processor';

import {
  sender
} from './utils/sender';

import {
  watch
} from './utils/watcher';


export function openFile() {
  let files = dialog.showOpenDialog({
    properties: ['openFile']
  });
  if (files === undefined) {
    console.log('file open aborted by user');
    return null;
  } else {
    return files[0];
  }
}

export function processFile(file) {
  let presentationFile = file;
  app.addRecentDocument(presentationFile);
  console.log(presentationFile);
  let slidesHTML = processing(presentationFile);
  watch(presentationFile);
  global.presentationFile = presentationFile;
  sender([global.slidesWindow, global.commentsWindow], 'slides', slidesHTML);
}
