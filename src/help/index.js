import * as fs from 'fs';
import {
  sender
} from '../utils/sender';
import {
  processing
} from '../processor';
const fileExists = require('file-exists');
export function loadHelp() {
  // console.log('in app/help/' + process.cwd());
  // let exists = fileExists('./app/help/help.md');
  // if (exists) console.log('file exists ', exists);
  let res = processing('./app/help/help.md');
  if (res !== null) {
    // console.log(global.windows);
    return res;
  } else {
    return null;
  }
}
