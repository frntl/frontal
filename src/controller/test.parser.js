/**
 * This file is just for testing the functions
 *
 */
import * as parser from './parser';
import * as fs from 'fs';
import * as md from 'markdown';

// let res = parser.md("## test");
// let res = parser.json('{"one":"two"}');
fs.readFile('./../../examples/presentation.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let slides = parser.md2json(data);
    for(let i = 0; i < slides.length;i++){
      console.log(slides[i][0]);
    }
    // let slides = parser.md(data);
    // console.log(`we found ${slides.length} slides` );
  }
});