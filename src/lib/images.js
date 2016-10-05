
// - should take html or markdown as input
// - find <img src
// - if the link as a relativ link
// - use path.resolve to fix the link based on presentations location
let cheerio = require('cheerio');
const sharp = require('sharp');
import * as path from 'path';
import * as fs from 'fs';

export function linker(data, rootPath) {
  let $ = cheerio.load(data);
  $('img').each((i, elem) => {
    // do the replacing here
    let src = $(elem).attr('src');
    console.log(src);
    if(!src.startsWith('http')) {
      let res = path.resolve(rootPath, src);
      // console.log(res);
      $(elem).attr('src', res);
    }
  });
  let fixedData = $.html();
  return fixedData;
}

export function thumbs(route) {
  let files = fs.readdirSync(route, 'utf8');
  for(let file of files) {
    let ext = path.extname(file);
    if(ext === 'png') {
      sharp(file).resize(200, null).toFile(file, (err)=>{
        if(err) {
          console.error(err);
        }
      });
    }
  }
  sharp();
}
