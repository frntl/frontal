import * as parser from './parser';
import * as comments from './comments';
const removeHtmlComments = require('remove-html-comments');
export function slides(data) {
  let slds = parser.md2html(data);
  for (let i = 0; i < slds.length; i++) {
    slds[i] = removeHtmlComments(slds[i])
      .data;
  console.log(slds[i]);
  }
  // console.log('slds ' , slds);
  let cmts = comments.get(slds);
  // console.log('cmts ' , cmts);
  return {
    slides: slds,
    comments: cmts
  };
}
