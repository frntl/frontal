export function sender(wins, title, msg) {
  wins.forEach(function(w, i) {
    console.log(msg);
    if (w !== null) {
      w.webContents.send(title, {
        msg: msg
      });
    }
  });
}
