const JsonDB = require('node-json-db');
let path = null;
let database = null;

function setGlobal(db) {
  global.database = db;
}
export function connect(filePath, collection) {
  path = filePath + '/' + collection;
  database = new JsonDB(path, true, true);
  console.log('connected to db');
  setGlobal(database);
}
export function save(data) {
  database.push(data);
  setGlobal(database);
}
export function get(query) {
  try {
    let res = database.get(query);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export function del(data) {
  global.database.delete(data);
}
export function save() {
  database.save();
  setGlobal(database);
}
export function reload() {
  global.database.reload();
}
