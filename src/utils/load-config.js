const yaml = require('js-yaml');
import * as fs from 'fs';
const fileExists = require('file-exists');


function checkFile(p) {
  return fileExists(p) ? true : false;
}
// Get document, or throw exception on error
export function yamlLoader(yamlFilePath) {
  let doc = null;
  if(checkFile(yamlFilePath)) {
    let content = fs.readFileSync(yamlFilePath, 'utf8');
    doc = yaml.safeLoad(content);
  }
  console.log(doc);
  return doc;
}
