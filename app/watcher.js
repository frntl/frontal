'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = watch;

var _reloadPresentation = require('./reload-presentation');

var chokidar = require('chokidar');
var chalk = require('chalk');
function watch(filePath) {
  var watcher = chokidar.watch(filePath, {
    ignored: /[\/\\]\./,
    persistent: true
  });
  watcher.on('change', function (p) {
    console.log('File at "' + p + '" has changed');
    (0, _reloadPresentation.reload)();
  });
  watcher.on('error', function (error) {
    console.log('An error has happend', error);
  });
  watcher.on('ready', function () {
    return console.info(chalk.green('Ready to watch for changes'));
  });
}