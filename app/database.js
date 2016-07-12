'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;
exports.save = save;
exports.get = get;
exports.del = del;
exports.save = save;
exports.reload = reload;
var JsonDB = require('node-json-db');
var path = null;
var database = null;

function setGlobal(db) {
  global.database = db;
}
function connect(filePath, collection) {
  path = filePath + '/' + collection;
  database = new JsonDB(path, true, true);
  console.log('connected to db');
  setGlobal(database);
}
function save(data) {
  database.push(data);
  setGlobal(database);
}
function get(query) {
  try {
    var res = database.get(query);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}
function del(data) {
  global.database.delete(data);
}
function save() {
  database.save();
  setGlobal(database);
}
function reload() {
  global.database.reload();
}