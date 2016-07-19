'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reload = reload;

var _processor = require('./processor');

var _sender = require('./sender');

var chalk = require('chalk');
function reload() {
  if (global.presentationFile !== null && global.windows.length > 1) {
    var res = (0, _processor.processing)(global.presentationFile);
    // console.log('res in menu.js ', res);
    if (res !== null) {
      // database.push('/slides', res);
      // global.database = database;
      // console.log(res);
      (0, _sender.sender)(global.windows, 'slides', res);
    }
  } else {
    console.log(chalk.red('Error reloading file'));
    console.log('global.presentationFile ', global.presentationFile);
    console.log('global.windows.length ', global.windows.length);
  }
}