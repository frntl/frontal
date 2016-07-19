import {
  expect
}
from 'chai';
import {
  linker
} from '../src/image-linker.js';

import * as fs from 'fs';
const fileExists = require('file-exists');
const cheerio = require('cheerio');


const absolutPath = `${process.cwd()}/examples/presentation/`;
const data = '<img src="https://avatars1.githubusercontent.com/u/315106?v=3&s=460"><img src="./me-fro.png">';
describe('linker', () => { // eslint-disable-line no-undef
  it('should return a string', (done) => { // eslint-disable-line no-undef
    let res = linker(data, absolutPath);
    expect(res)
      .to.be.a('string');
    done();
  });
  it('should contain src="/Users', (done) => { // eslint-disable-line no-undef
    let res = linker(data, absolutPath);
    expect(res)
      .to.contain('<img src="/Users');
    done();
  });
  it('should have an valid image path after connecting', (done)=>{ // eslint-disable-line no-undef
    let res = linker(data, absolutPath);
    let $ = cheerio.load(res);
    $('img').each((i, elem) => {
      let src = $(elem).attr('src');
      if(src.startsWith('/Users')) {
        let exists = fileExists(src);
        expect(exists).to.be.true;// eslint-disable-line no-unused-expressions
        done();
      }
    });
  });
});
