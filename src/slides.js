import * as parser from './parser';
import {
  linker
} from './utils/images';
import {
  hrefer
} from './utils/href-linker';
const marked = require('marked');

import {uncomment} from './utils/uncomment.js';

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
    let uncommented = [];
    for (let j = 0; j < clean.comments.length; j++) {
      uncommented.push(marked(uncomment(clean.comments[j])));
    }

    // console.log('parsed.attributes[i] ' , parsed.attributes[i]);
    objs.push({
      slide: clean.data,
      comments: uncommented.join('<br><br>'),
      attributes: parsed.attributes[i]
    });
  }
  return objs;
}

