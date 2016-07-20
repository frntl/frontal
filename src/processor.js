import {
  slides
} from './slides';
import * as fs from 'fs';
import * as path from 'path';
import {watch} from './utils/watcher';
import {sender} from './utils/sender';

export function processing (filePath) {
  global.name = path.basename(filePath, path.extname(filePath));
  global.presentationFile = filePath;
  global.presetationRoot = path.dirname(filePath);
  let fileContentMD = fs.readFileSync(filePath, 'utf8');
  if (fileContentMD !== null) {
    let slidesHTML = slides(fileContentMD);
    if (slidesHTML !== null) {
      return slidesHTML;
    }else {
      throw Error(`Could not convert MD to HTML from ${filePath}`);
    }
  } else {
    throw Error(`Could not read file ${filePath}`);
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
