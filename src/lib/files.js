const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
import {processing} from './processor';
import {sender} from './sender';
import {watch} from './watcher';
import {yamlLoader} from './load-yaml';
import {tomlLoader} from './load-toml';
import {dirname, resolve} from 'path';

export function detectTomlConfig(filePath) {
  var onlypath = dirname(filePath);
  console.log(onlypath);
  let res = tomlLoader(onlypath + '/_frontal.toml');
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
export function setRecentFiles (filePath) {
  let recentFiles = global.config.get('recentFiles');
  recentFiles.unshift(resolve(__dirname, filePath));
  while(recentFiles.length > global.config.get('maxRecentFiles')) {
    recentFiles.pop();
  }
  global.config.set('recentFiles', recentFiles);
}

export function getRecentFiles () {
  return global.config.get('recentFiles');
}

export function processFile(file) {
  sender([global.slidesWindow, global.commentsWindow], 'new-file', null);
  let presentationFile = file;
  app.addRecentDocument(presentationFile);
  setRecentFiles(presentationFile);
  console.log(presentationFile);
  let parsedYaml = detectTomlConfig(presentationFile);
  let slidesHTML = processing(presentationFile, parsedYaml);
  watch(presentationFile);
  global.presentationFile = presentationFile;
  sender([global.slidesWindow, global.commentsWindow], 'slides', slidesHTML);
}

