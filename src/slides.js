import * as parser from './parser';
import * as comments from './comments';
export function slides(data) {
  let slds = parser.md2html(data);
  let cmts = comments.get(slds);
  return {
    slides: slds,
    comments: cmts
  };
}
