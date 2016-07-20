// - should take html or markdown as input
// - find <img src
// - if the link as a relativ link
// - use path.resolve to fix the link based on presentations location
let cheerio = require('cheerio');
import * as path from 'path';

export function linker(data, rootPath) {
  let $ = cheerio.load(data);
  $('img').each((i, elem) => {
    // do the replacing here
    let src = $(elem).attr('src');
    if(!src.startsWith('http')) {
      // console.log(src);
      let res = path.resolve(rootPath, src);
      // console.log(res);
      $(elem).attr('src', res);
    }
  });
  let fixedData = $.html();
  return fixedData;
}
