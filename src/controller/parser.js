// https://github.com/evilstreak/markdown-js
import * as mark from 'markdown';

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

export function parser (){
  // nothing her yet
}
/**
 * just parse some json string
 * @param  {String}) {            return JSON.parse(data [description]
 * @return {[type]}       [description]
 */
export function json (data) { return JSON.parse(data)};
/**
 * [md2json description]
 * @param  {String} Markdown String
 * @return {Array of Arrays} The whole markdown splitted into Arrays/Objects organized in slides
 * eg
 * [ [ [ 'header', [Object], 'Heading 1' ],
    [ 'header', [Object], 'Hello World Heading 2' ],
    [ 'para',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ] ],
  [ [ 'header', [Object], 'Heading three' ],
    [ 'code_block', 'print "Hello world"' ] ] ]
 */
export function md2json(data){
  // the mardown.js lib already
  // parses to json woohoo! \o/
  // so we just grab that

  let jarr = mark.markdown.parse(data);
  // console.log(jarr);
  let slides = []; // will hold the final result
  let container = []; // will hold intermidiate results
  // loop them all
  for(let i = 0; i < jarr.length;i++){
    // the first one is not an array.
    // It just says 'markdown'
    // we dont need that
    // all the others are arrays so lets get it
    if(jarr[i].constructor === Array){
      // console.log('is an array');
      // push it to the container
      container.push(jarr[i]);
      // test for hr
      if(jarr[i][0] === 'hr'){
        container.pop(); // remove the hr again
          slides.push(container.slice()); // copy the array into the final array
        container.length = 0; // empty the intermidiate arr
      }
    }
  }
  return slides;
}

/**
 * [md2html description]
 * @param  {String} data a Markdown String
 * @return {HTML Array} parsed HTML splitted to slides
 */
export function md2html (data){
  // just split the MD in a simple way at the
  // hr before it is html
  let mdslides = data.split(/\n---\n/);
  let slides = [];
  for(let i = 0; i < mdslides.length; i++){
    slides.push(mark.markdown.toHTML(mdslides[i]));
  }
  return slides;
}


    /*

    1. The parser receives the content of a text-file either json or markdown the switch between parser is determined by file-extension.

    var parser_md = function(){

      var parser = function(){
        //init
      }

      parser();

      parser.start = function(file_content){
        var slides = [
          {
            template: "title.html", //If this is not set it defaults to "index.html"
            title: "<h1>title content</h1>",
            content: "<ul><li>this</li><li>is one example of</li><li>markdown turned to html</li></ul>",
            img: '<img src="" />'
          }
        ];

        return slides;
      }

      return parser;
    };

    */