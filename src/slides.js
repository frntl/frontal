import * as parser from './parser';
// import * as comments from './comments';
const removeHtmlComments = require('remove-html-comments');
const entities = require('entities');
const chalk = require('chalk');

export function slides(data) {
  let slds = parser.md2html(data);
  // let cleanslds = [];
  // let cmts = [];
  let objs = [];
  for (let i = 0; i < slds.length; i++) {
    let clean = removeHtmlComments(entities.decodeHTML(slds[i]));
    // cleanslds[i] = clean.data;
  // console.log('removing comments');
    // console.log(chalk.red('slides.js Cleaned HTML: ') + JSON.stringify(clean, null, 2));
    // cmts.push({slideNumber: i, comments: clean.comments.join('\n')});
    let uncommented = [];
    for(let j = 0; j < clean.comments.length; j++) {
      uncommented.push(uncomment(clean.comments[j]));
    }
    objs.push({slide: clean.data, comments: uncommented.join('<br><br>')});
  }
  // console.log('slds ' , slds);
  // let cmts = comments.get(slds);
  // console.log('cmts ' , cmts);
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
