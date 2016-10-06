const {ipcMain} = require('electron');

export function receive() {
  ipcMain.on('thumbs-ready', (event, arg) =>{
    console.log(arg);
    // thumbs(arg);
  });
}
