
const isArray = require('lodash.isarray');
const find = require('lodash.find');

/**
 * process the toml configuration file and create the
 * attributes for each slide
 * @param  {Object} config the parsed toml file
 * @param  {Number} length the of slides
 * @return {Array} an array of objects with {header: 'foo', footer: 'bah'};
 */
export function processConfig (config, length) {
  let result = []; // will hold the result
  console.log(config);
  for(let i = 0; i < length; i++) {
    let obj = {header: '', footer: ''};
    if(config.hasOwnProperty('header')) {
      console.log('has global header');
      obj.header = config.header;
    }
    if(config.hasOwnProperty('footer')) {
      console.log('has global footer');
      obj.footer = config.footer;
    }
    if(config.hasOwnProperty('slides')) {
      if(isArray(config.slides)) {
        let res = find(config.slides, (o)=> (o.index - 1) === i);
        if(res !== undefined) {
          console.log('yeah found ', res);
          if(res.hasOwnProperty('header')) {
            obj.header = res.header;
          }
          if(res.hasOwnProperty('footer')) {
            obj.footer = res.footer;
          }
        }else{
          console.log('no item found with matching index found ');
        }
      }
    }
    result.push(obj);
  }
  return result;
}