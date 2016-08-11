const {dialog} = require('electron');


import {sender, senderManaged} from './sender';
import {openFolder, folderExists} from './files';
const fileExists = require('file-exists');
export function switchTheme(themeName) {
  console.log('themeName', themeName);

  global.config.set('currentTheme', themeName);
  senderManaged('switch-theme', themeName);
  // sender([global.slidesWindow, global.commentsWindow], 'switch-theme',
    // themeName);
}

export function loadCustomTheme () {
  let res = openFolder();
  console.log(`the folder at ${res} has a css folder: `, folderExists(res + '/css'));
  console.log(`the folder at ${res} has a css folder and a main.css: `, fileExists(res + '/css/main.css'));
  console.log(`the folder at ${res} has a css folder and a comments-main.css: `, fileExists(res + '/css/main-comments.css'));
  if(folderExists(res + '/css')) {
    let data = {
      css: {
        slidesTheme: null,
        commentsTheme: null,
        path: res + '/css'
      }
    };
    if(fileExists(res + '/css/main.css')) {
      data.css.slidesTheme = true;
    }
    if(fileExists(res + '/css/main-comments.css')) {
      data.css.commentsTheme = true;
    }

    if(data.css.commentsTheme === false && data.css.slidesTheme === false) {
      let msg = `There was no main.css nor a main-comments.css in your selected path "${res}"`;
      if(process.env.NODE_ENV === 'development') { // eslint-disable-line no-process-env
        console.error(msg);
      }else{
        dialog.showErrorBox('Error loading theme', msg);
      }
      return;
    }

    // yay we found semething
    // lets do it
    // global.config.set('customTheme', data.css.path);
    // global.config.set('currentTheme', 'custom');
    senderManaged('switch-custom-theme', data);
    // sender([global.slidesWindow, global.commentsWindow], 'switch-custom-theme', data);

  } else {
    let msg = `There was no css folder in your path "${res}"`;
    if(process.env.NODE_ENV === 'development') { // eslint-disable-line no-process-env
      console.error(msg);
    }else{
      dialog.showErrorBox('Error loading theme', msg);
    }
    return;
  }

}
