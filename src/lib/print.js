const electron = require('electron');
const windowManager = require('electron-window-manager');
import {sender, senderManaged} from './sender';

export function thumbs() {
  let currWin = windowManager.getCurrent();
  senderManaged('down', 'Hello down from main!');

}
