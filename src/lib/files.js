const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
import {processing} from './processor';
import {sender, senderManaged, senderManagedNewFile} from './sender';
import {watch} from './watcher';
import {yamlLoader} from './load-yaml';
import {tomlLoader} from './load-toml';
import {dirname, resolve, basename, extname} from 'path';
import * as fs from 'fs';
const uniq = require('lodash.uniq');
const uuid = require('uuid');

const windowManager = require('electron-window-manager');

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

export function openFolder () {
  let folders = dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if(folders === undefined) {
    console.log('folder open aborted by user');
    return null;
  } else{
    return folders[0];
  }
}
export function setRecentFiles (filePath) {
  let recentFiles = global.config.get('recentFiles');
  recentFiles.unshift(resolve(__dirname, filePath));
  recentFiles = uniq(recentFiles);
  while(recentFiles.length > global.config.get('maxRecentFiles')) {
    recentFiles.pop();
  }
  global.config.set('recentFiles', recentFiles);
}

export function getRecentFiles () {
  return global.config.get('recentFiles');
}

export function processFile(file) {
  // sender([global.slidesWindow, global.commentsWindow], 'new-file', null);
  let presentationFile = file;
  app.addRecentDocument(presentationFile);
  setRecentFiles(presentationFile);
  console.log(presentationFile);
  let parsedYaml = detectTomlConfig(presentationFile);
  let slidesHTML = processing(presentationFile, parsedYaml);
  watch(presentationFile);
  global.presentationFile = presentationFile;
  let name = basename(presentationFile).replace(/[^a-z0-9]/gi, '_').toLowerCase() + uuid.v4();
  let slideLayoutPath = resolve(__dirname, '../views/slides.html');
  // console.log('slideLayoutPath', slideLayoutPath);

  let newWin = windowManager.createNew(name,
    'Slides',
    `file://${slideLayoutPath}`,
    'slides');
  newWin.open();
  // console.log(slidesHTML);
  senderManagedNewFile('slides', slidesHTML, name);
  // sender([global.slidesWindow, global.commentsWindow], 'slides', slidesHTML);
}

export function folderExists(folderPath) {
  return fs.existsSync(folderPath);
}

export function getDirs (rootDir, cb) {
  let files = fs.readdirSync(rootDir);
  // console.log(files);
  var dirs = [];
  for (let index = 0; index < files.length; index++) {
    let file = files[index];
    // if (file[0] !== '.') {
    let filePath = rootDir + '/' + file;
    let stat = fs.statSync(filePath);
    if(stat.isDirectory()) {
      dirs.push(file);
      // }
    }
  }
  return dirs;
}
