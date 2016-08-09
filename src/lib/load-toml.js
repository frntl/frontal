/**
 * because toml rules over yaml
 * supreme
 */
const {dialog} = require('electron');

const toml = require('toml');
import * as fs from 'fs';
const fileExists = require('file-exists');

function checkFile(p) {
  return fileExists(p) ? true : false;
}

export function tomlLoader(tomlFilePath) {
  let doc = null;
  if (checkFile(tomlFilePath)) {
    let tomlString = fs.readFileSync(tomlFilePath, 'utf8');
    try {
      doc = toml.parse(tomlString);
      // console.log(doc);
    } catch (err) {
      let msg = 'Parsing error on line ' + err.line + ', column ' + err.column +
    ': ' + err.message + '\nPlease read the help file or take a look at the ' +
    '.toml specs https://github.com/toml-lang/toml';
      if(process.env.NODE_ENV === 'development') { // eslint-disable-line no-process-env
        console.error(msg);
      }else{
        dialog.showErrorBox('Error parsing your .toml file', msg);

      }
      // throw err;
      return null;
    }
    return doc;
  } else {
    return null;
  }
}
