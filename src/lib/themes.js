import {sender} from './sender';
export function switchTheme(themeName) {
  console.log('themeName', themeName);

  global.config.set('currentTheme', themeName);
  sender([global.slidesWindow, global.commentsWindow], 'switch-theme',
    themeName);
}
