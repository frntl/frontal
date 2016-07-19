"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sender = sender;
function sender(wins, title, msg) {
  wins.forEach(function (w, i) {
    // console.log(title);
    w.webContents.send(title, {
      msg: msg
    });
    // statements
  });
}