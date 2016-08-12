

const windowManager = require('electron-window-manager');

export function openPrefs() {
  let prefsWin = windowManager.createNew('prefs', 'Preferences', `file://${__dirname}/prefs.html`, 'prefs');
  prefsWin.open();
  return prefsWin;
}


