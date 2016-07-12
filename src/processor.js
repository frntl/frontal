import {
  slides
} from './slides';
import * as fs from 'fs';
export function process(path) {
  let res = fs.readFileSync(path, 'utf8');
  if (res !== null) {
    let d = slides(res);
    return d;
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
