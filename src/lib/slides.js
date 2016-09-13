import * as parser from './parser';
import {linker} from './images';
import {hrefer} from './href-linker';
import {uncomment} from './uncomment';
import {processToml} from './load-toml';
const marked = require('marked');
const isArray = require('lodash.isarray');
const removeHtmlComments = require('remove-html-comments');
const chalk = require('chalk');

export function slides(data, config) {
  let parsed = parser.md2htmlMarked(data);
  let slds = parsed.slides;
  let objs = [];
  let useTomlConfig = false;
  let tomlAttributes = null;
  if (config) {
    useTomlConfig = true;
    tomlAttributes = processToml(config, slds.length);
  }

  for (let i = 0; i < slds.length; i++) {
    let clean = removeHtmlComments((slds[i]));
    clean.data = linker(clean.data, global.presentationRoot);
    clean.data = hrefer(clean.data);
    let uncommented = [];
    for (let j = 0; j < clean.comments.length; j++) {
      let rmComments = uncomment(clean.comments[j]);
      let html = marked(rmComments);
      let linked = linker(html, global.presentationRoot);

      let hrefed = hrefer(linked);
      uncommented.push(hrefed);
    }
    let attr = null;
    if(useTomlConfig) {
      attr = tomlAttributes[i];
    }else {
      attr = parsed.jsonAttributes[i];
    }
    objs.push({
      slide: clean.data,
      comments: uncommented.join('<br><br>'),
      attributes: attr
    });
  }
  return objs;
}
