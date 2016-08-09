import * as fs from 'fs';
const fm = require('json-front-matter');


export function frontmatter(data) {
  var json = fm.parse(data);
  return json;
}
