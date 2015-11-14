/**
 * This file is just for testing the functions
 *
 */
import * as parser from './parser';
import * as fs from 'fs';
// import * as md from 'markdown';
// import {json} from './parser';

let res = parser.json('{"one":"two"}');
console.log(res);
// test the md2json parsing
fs.readFile('./../../examples/presentation.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('md2json parsing test\n');
    let slides = parser.md2json(data);
    for(let i = 0; i < slides.length;i++){
      console.log(slides[i][0]);
    }
    console.log(`we found ${slides.length} slides` );
  }
});

// test the md2html parsing
fs.readFile('./../../examples/presentation.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('md2html parsing test\n');
    let slides = parser.md2html(data);
    console.log(`we have ${slides.length} slides`);
    for(let i = 0; i < slides.length;i++){
      console.log(slides[i]);
    }
    console.log(`we found ${slides.length} slides` );
  }
});
