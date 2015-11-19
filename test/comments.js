import {
  expect
}
from 'chai';

import * as comments from '../src/controller/comments';
import * as parser from '../src/controller/parser';
import * as fs from 'fs';

describe('Comments', function() {

  describe('#get', function() {
    it('Should return an Array of Objects. These Objects contain all the comments per slide', (done) => {
      let data = `# h1 slide 1\n## h2 slide 1\n<!-- comment slide 1 -->\n\n---\n ## h2 slide 2\n<!-- comments on slide 2 -->\n---\n`
      let slides = parser.md2html(data);
      let result = comments.get(slides);
      expect(result).to.be.instanceof(Array);
      expect(result[0]).to.be.instanceof(Object);
      expect(result[0]).to.be.have.property('comments');
      expect(result[0].comments).to.be.instanceof(Array).and.not.equal(null);
      expect(result[0].comments[0]).to.a('string');
      expect(result[0]).to.be.have.property('slide');
      expect(result[0].slide).to.be.a('number');
      done();
    });
  });

  describe('#get', function() {
    it('Should return an Array of Objects. These Objects contain all the comments per slide should accept the result of parser. Testing with real file ./examples/presentation.md', (done) => {
      fs.readFile('./examples/presentation.md', 'utf8', function(err, data){
        if(err!== null){
        throw(err);
        } else{
          let slides = parser.md2html(data);
          let result = comments.get(slides);
          console.log(result);
          done();
        }
      })
    });
  });
});