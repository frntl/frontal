const BrowserWindow = require('electron').BrowserWindow;
export function help() {
  let win = new BrowserWindow({
    width: 400,
    height: 600,
    x: 800,
    y: 0,
    closable: true,
    title: 'Help',
    defaultEncoding: 'utf8',
    webPreferences: {
      defaultFontSize: 20,
      defaultMonospaceFontSize: 20
    }
  });
  let options = {
    extraHeaders: 'Content-Type: text/html; charset=utf-8'
  };
  win.loadURL(`file://${__dirname}/help.md`, options);
  win.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // helpWindow = global.helpWindow = null;
  });
  return win;
}
