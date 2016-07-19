import * as parser from './parser';
import {linker} from './image-linker';
const removeHtmlComments = require('remove-html-comments');
const entities = require('entities');
const chalk = require('chalk');

export function slides(data) {
  let slds = parser.md2htmlMarked(data);
  let objs = [];
  for (let i = 0; i < slds.length; i++) {
    let clean = removeHtmlComments(entities.decodeHTML(slds[i]));
    clean.data = linker(clean.data, global.presetationRoot);
    // console.log(chalk.red('slides.js Cleaned HTML: ') + JSON.stringify(clean, null, 2));
    let uncommented = [];
    for(let j = 0; j < clean.comments.length; j++) {
      uncommented.push(uncomment(clean.comments[j]));
    }
    objs.push({slide: clean.data, comments: uncommented.join('<br><br>')});
  }
  return objs;
}

function uncomment (str) {
  let regex = /(<!--)([\s\S]*?)(-->)/g;
  let res = regex.exec(str);
  let cleaned = '';
  if (res !== null) {
    cleaned = res[2];
  }
  return cleaned;
}
