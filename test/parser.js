// import * as chai from 'chai'; // wont work
import {
  expect
}
from 'chai';
import * as fs from 'fs';
import * as parser from '../src/controller/parser.js';

describe('Parser', function() {
  describe('#json()', function() {
    it('should return an Object', function(done) {
      let str = '{"x":12,"y":100}';
      let res = parser.json(str);
      expect(res).to.be.instanceof(Object);
      done();
    });
  });

  describe('#md2html()', function() {
    it('should accept an Markdown file content and return an Array of HTML Strings', function(done) {
      fs.readFile('./examples/presentation.md', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          done();
        } else {
          let res = parser.md2html(data);
          console.log(res);
          expect(res).to.be.instanceof(Array);
          expect(res[0]).to.be.a('string');
          done();
        }
      });
    });

  });

  describe('#md2json()', function() {
    it('should accept an Markdown file content and return an Array of Arrays', function(done) {
      fs.readFile('./examples/presentation.md', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          done();
        } else {
          let res = parser.md2json(data);
          expect(res).to.be.instanceof(Array);
          expect(res[0]).to.be.instanceof(Array);
          done();
        }
      });

    });
  });
});