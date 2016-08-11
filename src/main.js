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
import {initWindows} from './lib/windows';
if (process.env.NODE_ENV === 'development') {// eslint-disable-line no-process-env
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
// global.slidesWindow = null;
// global.commentsWindow = null;
global.helpFilePath = `${__dirname}/help/help.md`;
global.config = new Config(require('./config/default.json'));


function createWindows() {
  // Create the browser window.
  // global.error('displays', displays);
  // Create the browser window.
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize;
// global.slidesWindow = new BrowserWindow({
  //   width: (width / 3) * 2,
  //   height: height,
  //   x: 0,
  //   y: 0,
  //   title: 'Frontal',
  //   closable: false,
  //   frame: false,
  //   titleBarStyle: 'hidden'
  // });

  // windowManager.init({
  //   layouts: {
  //     slides: '/views/slides.html',
  //     notes: '/views/comments.html'
  //   }
  // });
  initWindows(width, height);
  // windowManager.templates.set('slides', {
  //   width: (width / 3) * 2,
  //   height: height,
  //   x: 0,
  //   y: 0,
  //   title: 'Frontal',
  //   closable: true,
  //   frame: false,
  //   titleBarStyle: 'hidden',
  //   resizable: true
  // });

  // windowManager.templates.set('notes', {
  //   width: (width / 3),
  //   height: height,
  //   x: (width / 3) * 2,
  //   y: 0,
  //   closable: false,
  //   frame: false,
  //   titleBarStyle: 'hidden',
  //   title: 'Frontal Speaker Notes',
  //   resizable: true

  // });

  // windowManager.templates.set('source', {
  //   closable: true,
  //   title: 'Intro Source',
  //   defaultEncoding: 'utf8',
  //   webPreferences: {
  //     defaultFontSize: 20,
  //     defaultMonospaceFontSize: 20
  //   },
  //   width: (width / 3),
  //   height: height,
  //   x: (width / 3) * 2,
  //   y: 0,
  //   frame: false,
  //   titleBarStyle: 'hidden',
  //   resizable: true
  // });
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
    // windowManager.open('intro', 'Intro', `file://${__dirname}/views/slides.html`, 'slides');
  }
  // Open the DevTools.
  // global.slidesWindow.webContents.openDevTools();
  //
  // Emitted when the window is closed.
  // global.slidesWindow.on('closed', () => {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   global.slidesWindow = null;
  // });
  // global.commentsWindow = new BrowserWindow({
  //   width: (width / 3),
  //   height: height,
  //   x: (width / 3) * 2,
  //   y: 0,
  //   closable: false,
  //   frame: false,
  //   titleBarStyle: 'hidden',
  //   title: 'Frontal Speaker Notes'
  // });
  // and load the index.html of the app.
  // global.commentsWindow.loadURL(`file://${__dirname}/views/comments.html`);
  // Open the DevTools.
  // global.commentsWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  // global.commentsWindow.on('closed', function() {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   global.commentsWindow = null;
  // });
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
  // if (global.slidesWindow === null || global.commentsWindow === null) {
  createWindows();
    // createMenues();
    // initialHelpLoader([global.slidesWindow, global.commentsWindow]);
  // }
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
