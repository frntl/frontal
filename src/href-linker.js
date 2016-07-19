let cheerio = require('cheerio');
export function hrefer(data) {
  let $ = cheerio.load(data);
  $('a').each((i, elem)=>{
    let url = $(elem).attr('href');
    $(elem).attr('onclick', `require('electron').remote.shell.openExternal("${url}")`);
    $(elem).attr('href', '#');
  });
  let fixedData = $.html();
  return fixedData;
}
