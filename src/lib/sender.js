/**
 * [sender description]
 * @param  {[type]} wins  [description]
 * @param  {[type]} title [description]
 * @param  {[type]} msg   [description]
 * @return {[type]}       [description]
 */
export function sender(wins, title, msg) {
  wins.forEach(function(w, i) {
    console.log('this is the ms in sender: ', msg);
    if (w !== null) {
      w.webContents.send(title, {
        msg: msg
      });
    }
  });
}
