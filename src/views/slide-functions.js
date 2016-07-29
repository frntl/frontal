

// some slide specific functions
// this file should
// - require all files in theme/js
// and execute them
// the js file can export one main function so we only have to execute on thing
// const reqAll = require('req-all');
// const modules = reqAll('./themes/default/js'); // this needs to be dynamic
import imagesLeft from './themes/default/js/images-left';
const $ = require('jquery');

    $('#slides').bind('DOMSubtreeModified', imagesLeft);

// console.log(modules);
// for (var key in modules) {
//   if (modules.hasOwnProperty(key)) {
//     console.log(key);
//     console.log(modules[key]);
//     $('#slides').bind('DOMSubtreeModified', (modules[key]));
//   }
// }

// // some slide specific functions
// import {
//   imagesLeft
// } from './utils/images';
// const $ = require('jquery');
// $('#slides').bind('DOMSubtreeModified', imagesLeft);