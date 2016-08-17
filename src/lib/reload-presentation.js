
import {senderManaged} from './sender';
import {processing} from './processor';
import {detectTomlConfig} from './files';


const chalk = require('chalk');
export function reload() {

  if (global.presentationFile !== null) {
    // processFile(global.presentationFile);
    let parsedYaml = detectTomlConfig(global.presentationFile);
    let slidesHTML = processing(global.presentationFile, parsedYaml);
    console.log(chalk.red('reload'));
    senderManaged('slides', slidesHTML);
  } else {
    console.log(chalk.red('Error reloading file'));
    console.log('global.presentationFile ', global.presentationFile);
  }


}
