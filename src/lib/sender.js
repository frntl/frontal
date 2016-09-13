/**
 * [sender description]
 * @param  {[type]} wins  [description]
 * @param  {[type]} title [description]
 * @param  {[type]} msg   [description]
 * @return {[type]}       [description]
 */
const windowManager = require('electron-window-manager');
const chalk = require('chalk');

// export function sender(wins, title, msg) {
//   wins.forEach(function(w, i) {
//     console.log('this is the ms in sender: ', msg);
//     if (w !== null) {
//       w.webContents.send(title, {
//         msg: msg
//       });
//     }
//   });
// }

export function senderManaged(title, msg) {
  let currWin = windowManager.getCurrent();
  console.log(chalk.red('senderManaged'));
  if(currWin !== false) {
    currWin.content().send(title, {msg: msg});
  }
}

export function senderManagedNewFile(title, msg, name) {
  let currWin = windowManager.get(name);
  // console.log(msg);
  currWin.content().on('did-finish-load', ()=>{
    currWin.content().send(title, {msg: msg});
    currWin.content().send('switch-theme', {
      msg: global.config.get('currentTheme')
    });
  });

}


