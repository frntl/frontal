const isArray = require('lodash.isarray');
const find = require('lodash.find');

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
      if(global.isDev) { // eslint-disable-line no-process-env
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


/**
 * process the toml configuration file and create the
 * attributes for each slide
 * @param  {Object} config the parsed toml file
 * @param  {Number} length the of slides
 * @return {Array} an array of objects with {header: 'foo', footer: 'bah'};
 */
export function processToml (config, length) {
  let result = []; // will hold the result
  // console.log(config);
  for(let i = 0; i < length; i++) {
    let obj = {header: '', footer: '', slide_numbering: false};
    if('header' in config) {
      // console.log('has global header');
      obj.header = config.header;
    }
    if('footer' in config) {
      // console.log('has global footer');
      obj.footer = config.footer;
    }
    if('slide_numbering' in config) {
      obj.slide_numbering = config.slide_numbering;
    }
    if('slides' in config) {
      if(isArray(config.slides)) {
        let res = find(config.slides, (o)=> (o.index - 1) === i);
        if(res !== undefined) {
          // console.log('yeah found ', res);
          if('header' in res) {
            obj.header = res.header;
          }
          if('footer' in res) {
            obj.footer = res.footer;
          }
          if('slide_numbering' in config) {
            obj.slide_numbering = res.slide_numbering;
          }
        }else{
          // console.log('no item found with matching index found ');
        }
      }
    }
    result.push(obj);
  }
  return result;
}
