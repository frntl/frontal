
import {
  sender
} from './sender';
import {processFile} from '../files';

const chalk = require('chalk');
export function reload() {

  if (global.presentationFile !== null) {
    processFile(global.presentationFile);
    // let res = processing(global.presentationFile, null);
    // // console.log('res in menu.js ', res);
    // if (res !== null) {
    //   // database.push('/slides', res);
    //   // global.database = database;
    //   // console.log(res);
    //   sender([global.slidesWindow, global.commentsWindow], 'slides', res);
    // }
  } else {
    console.log(chalk.red('Error reloading file'));
    console.log('global.presentationFile ', global.presentationFile);
  }


}
