// import * as fs from 'fs';
const windowManager = require('electron-window-manager');

export function help() {
  let helpWin = windowManager.createNew('help-source', 'The Help Source', `file://${__dirname}/help.html`, 'source');
  helpWin.open();
  return helpWin;
}
