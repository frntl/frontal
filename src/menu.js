import * as path from 'path';
const electron = require('electron');
const app = electron.app;
const shell = electron.shell;
const dialog = electron.dialog;
const JsonDB = require('node-json-db');
const chalk = require('chalk');


// import * as database from './database';
import {processing} from './processor';
import {sender} from './sender';
import {reload} from './reload-presentation';
import {watch} from './watcher';

export function buildTemplate(windows) {
  let template = [{
    label: 'File',
    submenu: [{
      label: 'Open...',
      accelerator: 'Super+O',
      click: function() {
        console.log('Open...');
        let files = dialog.showOpenDialog({
          properties: ['openFile']
        });
        if (files === undefined) {
          console.log('aborted by user');
        } else {
          let presentationFile = files[0];
          console.log(chalk.green(`presentationFile: ${presentationFile}`));
          // let dbFolderPath = path.dirname(presentationFile);
          // let dbFileName = path.basename(presentationFile, path.extname(presentationFile));
          global.name = path.basename(presentationFile, path.extname(presentationFile));
          global.presentationFile = presentationFile;
          global.presetationRoot = path.dirname(presentationFile);
          // let database = new JsonDB(dbFolderPath + '/' + dbFileName, true, true);
          var res = processing(presentationFile);
          // console.log('res in menu.js ', res);

          if(res !== null) {
            watch(global.presentationFile);
            // database.push('/slides', res);
            // global.database = database;
            // console.log(res);
            sender(windows, 'slides', res);
          }
        }
      }
    }]
  }, {
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }]
  }, {
    label: 'View',
    submenu: [{
      label: 'Previous',
      accelerator: 'Up',
      click: function() {
        sender(windows, 'up', 'Hello up from main!');
      }
    }, {
      label: 'Next',
      accelerator: 'Down',
      click: function() {
        sender(windows, 'down', 'Hello down from main!');
      }
    }, {
      label: 'BWD',
      accelerator: 'left',
      click: function() {
        sender(windows, 'up', 'Hello up from main!');
      }
    }, {
      label: 'FWD',
      accelerator: 'Right',
      click: function() {
        sender(windows, 'down', 'Hello down from main!');
      }
    }, {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: reload
    }, {
      label: 'Toggle Full Screen',
      accelerator: (function() {
        if (process.platform === 'darwin') {
          return 'Ctrl+Command+F';
        } else {
          return 'F11';
        }
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: (function() {
        if (process.platform === 'darwin') {
          return 'Alt+Command+I';
        } else {
          return 'Ctrl+Shift+I';
        }
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    }]
  }, {
    label: 'Window',
    role: 'window',
    submenu: [{
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }]
  }, {
    label: 'Help',
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click: function() {
        shell.openExternal('http://electron.atom.io');
      }
    }]
  }];
  if (process.platform === 'darwin') {
    var name = app.getName();
    template.unshift({
      label: name,
      submenu: [{
        label: 'About ' + name,
        role: 'about'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        role: 'services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
      }, {
        label: 'Show All',
        role: 'unhide'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
          app.quit();
        }
      }]
    });
    var windowMenu = template.find(function(m) {
      return m.role === 'window';
    });
    if (windowMenu) {
      windowMenu.submenu.push({
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        role: 'front'
      });
    }
  }
  return template;
}
