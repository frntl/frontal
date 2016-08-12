import {resolve} from 'path';

const windowManager = require('electron-window-manager');

export function openNotesWindow () {
  let filePath = resolve(__dirname, '../views/comments.html');
  let notesWin = windowManager.createNew('notes',
    'Speaker Notes',
    `file://${filePath}`,
    'notes');
  // console.log('global.config', global.config);
  notesWin.open();
}

export function initWindows (width, height) {
  windowManager.init({
    layouts: {
      slides: '/views/slides.html',
      notes: '/views/comments.html'
    }
  });

  windowManager.templates.set('slides', {
    width: (global.isDev) ? (width / 3) * 2 : width,
    height: height,
    x: 0,
    y: 0,
    title: 'Frontal',
    closable: true,
    frame: false,
    titleBarStyle: 'hidden',
    resizable: true
  });

  windowManager.templates.set('notes', {
    width: (global.isDev) ? (width / 3) : width,
    height: height,
    x: (global.isDev) ? (width / 3) * 2 : 0,
    y: 0,
    closable: false,
    frame: false,
    titleBarStyle: 'hidden',
    title: 'Frontal Speaker Notes',
    resizable: true

  });
  windowManager.templates.set('prefs', {
    closable: true,
    title: 'Intro Source',
    defaultEncoding: 'utf8',
    webPreferences: {
      defaultFontSize: 20,
      defaultMonospaceFontSize: 20
    },
    width: (width / 3),
    height: height,
    x: (width / 3) * 2,
    y: 0,
    frame: false,
    titleBarStyle: 'hidden',
    resizable: true
  });

  windowManager.templates.set('source', {
    closable: true,
    title: 'Intro Source',
    defaultEncoding: 'utf8',
    webPreferences: {
      defaultFontSize: 20,
      defaultMonospaceFontSize: 20
    },
    width: (width / 3),
    height: height,
    x: (width / 3) * 2,
    y: 0,
    frame: false,
    titleBarStyle: 'hidden',
    resizable: true
  });
}
