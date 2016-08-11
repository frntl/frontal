import * as fs from 'fs';
const BrowserWindow = require('electron').BrowserWindow;
const windowManager = require('electron-window-manager');

export function help() {
  let helpWin = windowManager.createNew('help-source', 'The Help Source', `file://${__dirname}/help.html`, 'source');
  helpWin.open();
  // let win = new BrowserWindow({
  //   width: 400,
  //   height: 600,
  //   x: 800,
  //   y: 0,
  //   closable: true,
  //   title: 'Help',
  //   defaultEncoding: 'utf8',
  //   webPreferences: {
  //     defaultFontSize: 20,
  //     defaultMonospaceFontSize: 20
  //   }
  // });

  // let data = fs.readFileSync(`${__dirname}/help.md`, 'utf8');
  // win.webContents.send('setup', {
  //   msg: 'hello world'
  // });
  // helpWin.on('closed', function() {

  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   // helpWindow = global.helpWindow = null;
  // });
  return helpWin;
}
