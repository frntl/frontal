'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menu = menu;
exports.buildTemplate = buildTemplate;
var electron = require('electron');
var app = electron.app;
var shell = electron.shell;
var dialog = electron.dialog;
function menu() {}

function sender(wins, title, msg) {
  wins.forEach(function (w, i) {
    console.log(title);
    w.webContents.send(title, {
      msg: msg
    });
    // statements
  });
}
function buildTemplate(windows) {
  var template = [{
    label: 'File',
    submenu: [{
      label: 'Open...',
      accelerator: 'Super+O',
      click: function click() {
        console.log('Open...');
        var files = dialog.showOpenDialog({
          properties: ['openFile']
        });
        if (files === undefined) {
          console.log('aborted by user');
        } else {
          console.log(files[0]);
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
      click: function click() {
        sender(windows, 'up', 'Hello up from main!');
      }
    }, {
      label: 'Next',
      accelerator: 'Down',
      click: function click() {
        sender(windows, 'down', 'Hello down from main!');
      }
    }, {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function click(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.reload();
        }
      }
    }, {
      label: 'Toggle Full Screen',
      accelerator: function () {
        if (process.platform === 'darwin') {
          return 'Ctrl+Command+F';
        } else {
          return 'F11';
        }
      }(),
      click: function click(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: function () {
        if (process.platform === 'darwin') {
          return 'Alt+Command+I';
        } else {
          return 'Ctrl+Shift+I';
        }
      }(),
      click: function click(item, focusedWindow) {
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
      click: function click() {
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
        click: function click() {
          app.quit();
        }
      }]
    });
    var windowMenu = template.find(function (m) {
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