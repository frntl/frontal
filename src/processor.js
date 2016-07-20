import {
  slides
} from './slides';
import * as fs from 'fs';
import * as path from 'path';

export function processing (filePath) {
  global.name = path.basename(filePath, path.extname(filePath));
  global.presentationFile = filePath;
  global.presetationRoot = path.dirname(filePath);
  let res = fs.readFileSync(filePath, 'utf8');
  if (res !== null) {
    let d = slides(res);
    return d;
  } else {
    throw Error('Could not convert slides');
  }
  // fs.readFile(path, 'utf8', (error, data) => {
  //   if (error) {
  //     console.error(`Error while reading file: ${path} || ${error}`);
  //     return null;
  //   } else {
  //     console.log('d ' , d);
  //   }
  // });
}
