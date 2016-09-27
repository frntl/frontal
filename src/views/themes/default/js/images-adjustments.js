/* global window document */
// some fixes on images
const $ = require('jquery');
export default function() {
  // console.log('execution imagesLeft');
  // let imagesHTMLCollection = document.getElementsByTagName('img'); // eslint-disable-line no-undef
  // let images = Array.from(imagesHTMLCollection);
  let images = Array.from($('img'));
  if (images.length !== 0) {
    images.forEach((ele, i, arr) => {
      // use startsWith instead
      // ele.getAttribute('alt').startsWith('left')
      // ele.getAttribute('alt').startsWith('full-top')
      // ele.getAttribute('alt').startsWith('full')
      // looking for sub: could be done like this
      // ^.*?sub:(.*?)$
      if (ele.getAttribute('alt').startsWith('left') === true) {
        console.log('left image');
        $('#slides').removeClass('narrow');
        $('#slides').addClass('wide');
        $('p').addClass('pwide');
        // console.log('We ave an image that wants to be left aligned');
      } else if (ele.getAttribute('alt').startsWith('full-top') === true) {
        console.log('full-top image');
        let body = $('body');
        body.css('background-image', 'url(' + ele.src + ')');
        body.css('background-position', 'center');
        body.css('background-repeat', 'no-repeat');
        $('img[alt*="full-top"]').hide();
        // $('#frontal')
        let alltxt = $('h1, h2, h3, h4, h5, h6, p');
        alltxt.css('display', 'inline !important');
        // console.log(body.css('background-color'));
        alltxt.css('background-color', body.css('background-color'));
        alltxt.css('padding', '0px 5px 0px 5px');
        let texts = $('p, pre, blockquote');
        texts.css('margin', 'auto');
        let pre = $('pre');
        pre.css('margin', 'auto');
        pre.css('width', '50vw');
        pre.css('padding', '5px');
        let headlines = $('h1, h2, h3, h4, h5, h6');
        headlines.css('width', '100vw');
      } else if (ele.getAttribute('alt').startsWith('full') === true) {
        let img = $('img[alt*="full"]');
        console.log('full image');
        // TODO: move image out of p tag
        // sourround with </p><img><p>
        // or will this create an new error?
        //
        // var image = new Image();
        // image.src = img.attr("src");
        // console.log('image.src ' , image.src);
        // let w = image.naturalWidth;
        // let h = image.naturalHeight;
        // console.log('w ', w);
        // console.log('h ', h);
        // img.height(h).width(w);
        img.css('max-width', '100%');
        img.parent().css('max-width', '100%');
        $('#slides').css({
          'margin-left': '0%',
          'margin-right': '0%'
        });
      }else {
        $('#slides').removeClass('wide');
        $('#slides').addClass('narrow');
        $('p').removeClass('pwide');
        $('body').css('background-image', 'url()');
      }
      // check if the alt attributes contains the words
      // sub:
      // the ~ returns the index of the word if it is true
      //  and 0 if not
      if(~ele.getAttribute('alt').indexOf('sub:') !== 0) {
        let subtext = ele.getAttribute('alt').match(/^.*?sub\:(.*?)$/)[1];
        console.log(subtext);
        let height = $(window).height;
        let width = $(window).width;

        if($('#subtext').length === 0) {
          $('body').append('<div id="subtext"><div>');
        }
        let container = $('#subtext');
        console.log(container);
        container.html(`${subtext}`);
      }else{
        $('#subtext').remove();
      }
    });
  } else {
    $('#subtext').remove();
    $('p').removeClass('pwide');
    $('#slides').removeClass('wide');
    $('#slides').addClass('narrow');
    $('body').css('background-image', 'url()');
  }
}
