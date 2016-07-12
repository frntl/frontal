import * as slides from './slides';
import * as fs from 'fs';
export function processor(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      console.error(`Error while reading file: ${path} || ${error}`);
      return null;
    } else {
      return slides(data);
    }
  });
}
