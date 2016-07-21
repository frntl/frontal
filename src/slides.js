import * as parser from './parser';
import {
  linker
} from './utils/image-linker';
import {
  hrefer
} from './utils/href-linker';
const removeHtmlComments = require('remove-html-comments');
const chalk = require('chalk');
export function slides(data) {
  let parsed = parser.md2htmlMarked(data);
  let slds = parsed.slides;
  let objs = [];
  for (let i = 0; i < slds.length; i++) {
    let clean = removeHtmlComments((slds[i]));
    clean.data = linker(clean.data, global.presetationRoot);
    clean.data = hrefer(clean.data);
    // console.log(chalk.red('slides.js Cleaned HTML: ') + JSON.stringify(clean, null, 2));
    let uncommented = [];
    for (let j = 0; j < clean.comments.length; j++) {
      uncommented.push(uncomment(clean.comments[j]));
    }
    objs.push({
      slide: clean.data,
      comments: uncommented.join('<br><br>'),
      attributes: parsed.attributes
    });
  }
  return objs;
}

function uncomment(str) {
  let regex = /(<!--)([\s\S]*?)(-->)/g;
  let res = regex.exec(str);
  let cleaned = '';
  if (res !== null) {
    cleaned = res[2];
  }
  return cleaned;
}
