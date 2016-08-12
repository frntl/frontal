/* @flow */
const electron = require('electron');
const Menu = electron.Menu;
const app = electron.app;
const ipcMain = electron.ipcMain;
const MenuItem = electron.MenuItem;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
// const webContents = electron.webContents;
const pkg = require('./package.json');
const Config = require('electron-config');
const windowManager = require('electron-window-manager');
const isDev = require('electron-is-dev');
const chalk = require('chalk');
import {initWindows} from './lib/windows';
if (isDev) {// eslint-disable-line no-process-env
  require('electron-reload')(__dirname);
}
import {helpLoader, initialHelpLoaderManaged} from './help/help-loader';
import {buildTemplate} from './menu';
import {watch} from './lib/watcher';
import {processFile} from './lib/files';
import {sender} from './lib/sender';
import {openNotesWindow} from './lib/windows';
global.name = null;
global.database = null;
global.presetationRoot = null;
global.presentationFile = null;
global.isDev = isDev;

// global.slidesWindow = null;
// global.commentsWindow = null;
global.helpFilePath = `${__dirname}/help/help.md`;
global.config = new Config(require('./config/default.json'));


function createWindows() {
  // Create the browser window.
  // global.error('displays', displays);
  // Create the browser window.
  if(isDev) {
    console.log(chalk.bgYellow('We are in Dev Mode'));
  }
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize;
  initWindows(width, height);
  // and load the index.html of the app.
  // global.slidesWindow.loadURL(`file://${__dirname}/views/slides.html`);
  let introWin = windowManager.createNew('intro', 'Intro', `file://${__dirname}/views/slides.html`, 'slides');
  // let notesWindow = openNotesWindow();
  let notesWindow = windowManager.createNew('notes',
    'Speaker Notes',
    `file://${__dirname}/views/comments.html`,
    'notes');

  // // console.log('global.config', global.config);
  notesWindow.open();
  if(global.config.get('showIntroOnStratup') === true) {
    introWin.open();
  }

}

function createMenues() {
  let template = buildTemplate([global.slidesWindow, global.commentsWindow]);
  // Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

}
// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
app.on('will-finish-launching', (event) => {
  app.on('open-file', (e, filePath) => {
    e.preventDefault();
    console.log('User tried to open ' + filePath);
    processFile(filePath);
  });
});
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // app.quit();
    app.exit(0);

  }
});
app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // console.log('app:activate');
  createWindows();

});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  console.log('app:ready');
  // global.config.path
  // console.log('global.config.all ', global.config.store);
  // global.config.set('foo', 'bah');
  createWindows();
  createMenues();
  initialHelpLoaderManaged();

  // initialHelpLoader([global.slidesWindow, global.commentsWindow]);
});
