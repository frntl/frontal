const chokidar = require('chokidar');
const chalk = require('chalk');
import {reload} from './reload-presentation';

export function watch(filePath) {
  let watcher = chokidar.watch(filePath, {
    ignored: /[\/\\]\./,
    persistent: true
  });
  watcher.on('change', (p)=>{
    console.log(`File at "${p}" has changed`);
    reload();
  });
  watcher.on('error', (error)=>{
    console.log('An error has happend', error);
  });
  watcher.on('ready', ()=> console.info(chalk.green('Ready to watch for changes')));
}
