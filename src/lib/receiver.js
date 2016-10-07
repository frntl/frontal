const {ipcMain} = require('electron');
import {thumbs} from './images';

export function receive() {
  ipcMain.on('thumbs-ready', (event, arg) =>{
    // console.log('received message from renderer', arg);
    thumbs(arg);
  });
}
