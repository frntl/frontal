import * as fs from 'fs';
import {
  sender
} from '../utils/sender';
import {
  processing
} from '../processor';

let filePath = './app/help/help.md';
import {watch} from '../utils/watcher';

export function loadHelp() {
  // console.log('in app/help/' + process.cwd());
  // let exists = fileExists('./app/help/help.md');
  // if (exists) console.log('file exists ', exists);
  let res = processing(filePath);
  watch(filePath);
  if (res !== null) {
    return res;
  } else {
    return null;
  }
}
