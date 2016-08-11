const windowManager = require('electron-window-manager');

export function openNotesWindow () {
  let notesWin = windowManager.createNew('notes',
    'Speaker Notes',
    `file://${__dirname}/views/comments.html`,
    'notes');

  // console.log('global.config', global.config);
  notesWin.open();
}
