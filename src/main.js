const electron = require('electron');
const Menu = electron.Menu;
const app = electron.app;
const ipcMain = electron.ipcMain;
const MenuItem = electron.MenuItem;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const webContents = electron.webContents;
import {
  buildTemplate
} from './menu';
import {
  loadHelp
} from './help/index';
import {
  sender
} from './utils/sender';
global.name = null;
global.database = null;
global.presetationRoot = null;
global.presentationFile = null;
global.slidesWindow = null;
global.commentsWindow = null;
let slidesWindow = null;
let commentsWindow = null;

function windowsReady(wins) {

  let msg = loadHelp();
  wins.forEach((w, i, arr) => {
    w.webContents.on('did-finish-load', () => {
      w.webContents.send('slides', {
        msg: msg
      });
    });
  });
}

function createWindows() {
  // Create the browser window.
  // global.error('displays', displays);
  // Create the browser window.
  slidesWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    title: 'Frontal',
    closable: false,
    frame: false,
    titleBarStyle: 'hidden'
  });
  // and load the index.html of the app.
  slidesWindow.loadURL(`file://${__dirname}/views/slides.html`);
  // Open the DevTools.
  // slidesWindow.webContents.openDevTools();
  // slidesWindow.on('will-navigate', (e, url) => {
  //   if (url !== slidesWindow.getURL()) {
  //     e.preventDefault();
  //     shell.openExternal(url);
  //   }
  // });
  // Emitted when the window is closed.
  slidesWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    slidesWindow = global.slidesWindow = null;
  });
  // slidesWindow.on('ready-to-show', () => {
  //   console.log('ready-to-show');
  // });
  // slidesWindow.on('close', (event)=>{
  //   console.log('I do not want to be closed');
  //   // event.preventDefault();
  // });
  commentsWindow = new BrowserWindow({
    width: 400,
    height: 600,
    x: 800,
    y: 0,
    closable: false,
    title: 'Frontal Speaker Notes'
  });
  // and load the index.html of the app.
  commentsWindow.loadURL(`file://${__dirname}/views/comments.html`);
  // Open the DevTools.
  // commentsWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  commentsWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    commentsWindow = global.commentsWindow = null;
  });
  // global.windows.push(slidesWindow);
  // global.windows.push(commentsWindow);
  // sender(global.windows, 'hello', 'msg');
  // loadHelp([slidesWindow, commentsWindow]);
  global.commentsWindow = commentsWindow;
  global.slidesWindow = slidesWindow;
}

function createMenues() {
  let template = buildTemplate([slidesWindow, commentsWindow]);
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
}
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (slidesWindow === null || commentsWindow === null) {
    createWindows();
    createMenues();
  }
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindows();
  createMenues();
  windowsReady([slidesWindow, commentsWindow]);
});
// app.on('quit', ()=>{
//   slidesWindow.destroy();
//   commentsWindow.destroy();
//   app.exit();
// });
// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
app.on('will-finish-launching', (event) => {
  app.on('open-file', (e, filePath) => {
    e.preventDefault();
    console.log('User tried to open ' + filePath);
  });
});
