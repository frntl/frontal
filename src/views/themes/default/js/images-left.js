// some fixes on images
const $ = require('jquery');
export default function () {
  // console.log('execution imagesLeft');
  let imagesHTMLCollection = document.getElementsByTagName('img');

  // let images = Array.from(imagesHTMLCollection);
  let images = Array.from($('img'));
  if (images.length !== 0) {
    images.forEach((ele, i, arr) => {

      if (ele.getAttribute('alt') === 'left') {
        $('#slides').removeClass('narrow');
        $('#slides').addClass('wide');
        $('p').addClass('pwide');
        console.log('We ave an image that wants to be left aligned');
      } else if(ele.getAttribute('alt') === 'full-top') {
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
        alltxt.css('padding','0px 5px 0px 5px');

      } else if(ele.getAttribute('alt') === 'full') {
        let w = ele.naturalWidth;
        let h = ele.naturalHeight;
        console.log('w ', w);
        console.log('h ', h);
        let img = $('img[alt*="full"]');

        img.height(h).width(w);
        img.css('max-width','100%');
        img.parent().css('max-width','100%');
        $('#slides').css({
          'margin-left': '0%',
        'margin-right': '0%'
        });

      } else {
        $('#slides').removeClass('wide');
        $('#slides').addClass('narrow');
        $('p').removeClass('pwide');
        $('body').css('background-image', 'url()');


      }
    });
  } else {
    $('p').removeClass('pwide');
    $('#slides').removeClass('wide');
    $('#slides').addClass('narrow');
    $('body').css('background-image', 'url()');

  }
}
