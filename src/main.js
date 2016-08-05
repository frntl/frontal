const electron = require('electron');
const Menu = electron.Menu;
const app = electron.app;
const ipcMain = electron.ipcMain;
const MenuItem = electron.MenuItem;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const webContents = electron.webContents;
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname);
}
import {
  helpLoader,
  initialHelpLoader
} from './help/help-loader';
import {
  buildTemplate
} from './menu';
import {
  watch
} from './utils/watcher';
// import {
//   loadHelp
// } from './help/index';
import {
  sender
} from './utils/sender';
import {
  processing
} from './processor';
global.name = null;
global.database = null;
global.presetationRoot = null;
global.presentationFile = null;
global.slidesWindow = null;
global.commentsWindow = null;
global.helpFilePath = `${__dirname}/help/help.md`;
// let slidesWindow = null;
// let commentsWindow = null;
// load the help file on startup
// should be a preference
// function windowsReady(wins) {
//   global.presentationFile = global.helpFilePath;
//   let slidesHTML = processing(global.helpFilePath);
//   watch(global.presentationFile);
//   wins.forEach((w, i, arr) => {
//     w.webContents.on('did-finish-load', () => {
//       w.webContents.send('slides', {
//         msg: slidesHTML
//       });
//     });
//   });
// }
function createWindows() {
  // Create the browser window.
  // global.error('displays', displays);
  // Create the browser window.
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize;
  global.slidesWindow = new BrowserWindow({
    width: (width / 3) * 2,
    height: height,
    x: 0,
    y: 0,
    title: 'Frontal',
    closable: false,
    frame: false,
    titleBarStyle: 'hidden'
  });
  // and load the index.html of the app.
  global.slidesWindow.loadURL(`file://${__dirname}/views/slides.html`);
  // Open the DevTools.
  // global.slidesWindow.webContents.openDevTools();
  //
  // Emitted when the window is closed.
  global.slidesWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    global.slidesWindow = null;
  });
  global.commentsWindow = new BrowserWindow({
    width: (width / 3),
    height: height,
    x: (width / 3) * 2,
    y: 0,
    closable: false,
    frame: false,
    titleBarStyle: 'hidden',
    title: 'Frontal Speaker Notes'
  });
  // and load the index.html of the app.
  global.commentsWindow.loadURL(`file://${__dirname}/views/comments.html`);
  // Open the DevTools.
  // global.commentsWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  global.commentsWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    global.commentsWindow = null;
  });
  // global.windows.push(slidesWindow);
  // global.windows.push(commentsWindow);
  // sender(global.windows, 'hello', 'msg');
  // loadHelp([slidesWindow, commentsWindow]);
  // global.commentsWindow = commentsWindow;
  // global.slidesWindow = slidesWindow;
}

function createMenues() {
  let template = buildTemplate([global.slidesWindow, global.commentsWindow]);
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
}

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
app.on('will-finish-launching', (event) => {
  app.on('open-file', (e, filePath) => {
    e.preventDefault();
    console.log('User tried to open ' + filePath);
  });
});

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
  if (global.slidesWindow === null || global.commentsWindow === null) {
    createWindows();
    createMenues();
    initialHelpLoader([global.slidesWindow, global.commentsWindow]);
  }
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindows();
  createMenues();
  initialHelpLoader([global.slidesWindow, global.commentsWindow]);
});

