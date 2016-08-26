// https://github.com/evilstreak/markdown-js
import * as mark from 'markdown';
const marked = require('marked');
import {
  frontmatter
} from './frontmatter';
const verex = require('verbal-expressions');
const isEmpty = require('lodash.isempty');
// about this module:
// It exports 3 Things:
//     parser.json(data)
//     parser.md2json(data)
//     parser.md2html(data)
// to use it in a es6 way (if you are in /src/main.js)
// ```js
//     import * as parser from './controller/parser';
//     // or like this (not verified)
//     import {md2json} from './controller/parser';
// ```
export function parser() {
  // nothing her yet
}
/**
 * just parse some json string
 * @param  {String}) {            return JSON.parse(data [description]
 * @return {[type]}       [description]
 */
export function json(data) {
  return JSON.parse(data);
}
/**
 * [md2json description]
 * @param  {String} Markdown String
 * @return {Array of Arrays} The whole markdown splitted into Arrays/Objects organized in slides
 * eg
 * [ [ [ 'header', [Object], 'Heading 1' ],
    [ 'header', [Object], 'Hello World Heading 2' ],
    [ 'para',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit...  ' ] ],
  [ [ 'header', [Object], 'Heading three' ],
    [ 'code_block', 'print "Hello world"' ] ] ]
 */
export function md2json(data) {
  // the mardown.js lib already
  // parses to json woohoo! \o/
  // so we just grab that
  let jarr = mark.markdown.parse(data);
  // console.log(jarr);
  let slides = []; // will hold the final result
  let container = []; // will hold intermidiate results
  // loop them all
  for (let i = 0; i < jarr.length; i++) {
    // the first one is not an array.
    // It just says 'markdown'
    // we dont need that
    // all the others are arrays so lets get it
    if (jarr[i].constructor === Array) {
      // console.log('is an array');
      // push it to the container
      container.push(jarr[i]);
      // test for hr
      if (jarr[i][0] === 'hr') {
        container.pop(); // remove the hr again
        slides.push(container.slice()); // copy the array into the final array
        container.length = 0; // empty the intermidiate arr
      }
    }
  }
  return slides;
}
/**
 * [md2htmlMarked description]
 * @param  {String} data a Markdown String
 * @return {HTML Array} parsed HTML splitted to slides
 */
export function md2htmlMarked(data) {
  var tester = verex().lineBreak().then('---').lineBreak();
  marked.setOptions({
    smartypants: true,
    sanitize: false,
    highlight: function(code) {
      return require('highlight.js').highlightAuto(code).value;
    }
  });
  // console.log(tester);
  let testSplit = data.split(tester);
  // console.log('Testing json frontmatter per slide');
  // console.log(testSplit);
  // console.log(testSplit.length);
  let fmjsons = [];
  let htmls = [];
  let globalfm = false;
  testSplit.forEach((ele, i, arr) => {
    let tmpjson = frontmatter(ele);
    // console.log(tmpjson);
    if (i === 0 && 'global' in tmpjson.attributes) {
      globalfm = tmpjson.attributes.global;
      fmjsons.push(tmpjson.attributes);
    } else if (i !== 0 && globalfm === true) {
      // clone the object
      if (!('overwrite' in tmpjson.attributes)) {
        fmjsons.push(JSON.parse(JSON.stringify(fmjsons[0])));
      } else if ('overwrite' in tmpjson.attributes) {
        if (tmpjson.attributes.overwrite === true) {
          fmjsons.push(tmpjson.attributes);
        } else {
          fmjsons.push(JSON.parse(JSON.stringify(fmjsons[0])));
        }
      }
    } else {
      fmjsons.push(tmpjson.attributes);
    }
    htmls.push(marked(tmpjson.body));
  });
  let slides = htmls; // html.split('<hr>');
  let result = {};
  result.slides = slides;
  result.jsonAttributes = fmjsons;
  return result;
}
