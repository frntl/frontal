
// - should take html or markdown as input
// - find <img src
// - if the link as a relativ link
// - use path.resolve to fix the link based on presentations location
let cheerio = require('cheerio');
const lwip = require('lwip');
import * as path from 'path';
import * as fs from 'fs';

export function linker(data, rootPath) {
  let $ = cheerio.load(data);
  $('img').each((i, elem) => {
    // do the replacing here
    let src = $(elem).attr('src');
    // console.log(src);
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
  console.log('scaling thumbnails');
  let files = fs.readdirSync(route, 'utf8');
  // console.log(files);
  for(let file of files) {
    let ext = path.extname(file);
    // console.log(ext);
    if(ext === '.png') {
      // console.log('find image to process', file);
      lwip.open(`${route}/${file}`, (error, image)=>{
        if(error) {
          console.log('error in lwip', error);
        }else {
          image.scale(0.2, (e, img)=>{
            if(e) {
              console.log(e);
            } else {
              img.writeFile(`${route}/${file}`, (err)=>{
                if(err) {
                  console.error(err);
                }
              });
            }
          });
        }
      });
    }
  }
}
