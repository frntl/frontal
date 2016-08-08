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
import {
  yamlLoader
} from './utils/load-yaml';
import {
  dirname
} from 'path';
export function detectYamlConfig(filePath) {
  var onlypath = dirname(filePath);
  console.log(onlypath);
  let res = yamlLoader(onlypath + '/_frontal.yaml');
  if (res === false) {
    return null;
  } else {
    return res;
  }
}
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
  sender([global.slidesWindow, global.commentsWindow], 'new-file', null);
  let presentationFile = file;
  app.addRecentDocument(presentationFile);
  console.log(presentationFile);
  let parsedYaml = detectYamlConfig(presentationFile);
  let slidesHTML = processing(presentationFile, parsedYaml);
  watch(presentationFile);
  global.presentationFile = presentationFile;
  sender([global.slidesWindow, global.commentsWindow], 'slides', slidesHTML);
}
