const {dialog} = require('electron');


import {senderManaged} from './sender';
import {openFolder, folderExists} from './files';
const fileExists = require('file-exists');
export function switchTheme(themeName) {
  if (global.isDev) {
    console.log('themeName', themeName);
  }
  global.config.set('currentTheme', themeName);
  senderManaged('switch-theme', themeName);
}

export function loadCustomTheme () {
  let res = openFolder();

  if(global.isDev) {
    console.log(`the folder at ${res} has a css folder: `, folderExists(res + '/css'));
    console.log(`the folder at ${res} has a css folder and a main.css: `,
      fileExists(res + '/css/main.css'));
    console.log(`the folder at ${res} has a css folder and a comments-main.css: `,
      fileExists(res + '/css/main-comments.css'));

    console.log(`the folder at ${res} has a css folder: `, folderExists(res + '/js'));
    console.log(`the folder at ${res} has a css folder and a main.css: `,
      fileExists(res + '/css/main.css'));
    console.log(`the folder at ${res} has a css folder and a comments-main.css: `,
      fileExists(res + '/css/main-comments.css'));
  }

  let data = {
    css: {
      slidesTheme: null,
      commentsTheme: null,
      path: null
    },
    js: {
      path: null
    }
  };
  if(folderExists(res + '/css')) {
    data.css.path = res + '/css';

    if(fileExists(res + '/css/main.css')) {
      data.css.slidesTheme = true;
    }
    if(fileExists(res + '/css/main-comments.css')) {
      data.css.commentsTheme = true;
    }

    if(data.css.commentsTheme === false && data.css.slidesTheme === false) {
      let msg = `There was no main.css nor a main-comments.css in your selected path "${res}"`;
      if(global.isDev) { // eslint-disable-line no-process-env
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
    data.js.path = folderExists(res + '/js') ? res + '/js' : null;

    senderManaged('switch-custom-theme', data);
    // sender([global.slidesWindow, global.commentsWindow], 'switch-custom-theme', data);

  } else {
    let msg = `There was no css folder in your path "${res}"`;
    if(global.isDev) { // eslint-disable-line no-process-env
      console.error(msg);
    }else{
      dialog.showErrorBox('Error loading theme', msg);
    }
    return;
  }

}
