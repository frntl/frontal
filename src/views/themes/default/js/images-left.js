// some fixes on images
const $ = require('jquery');
export default function () {
  console.log('execution imagesLeft');
  let imagesHTMLCollection = document.getElementsByTagName('img');
  let images = Array.from(imagesHTMLCollection);
  if (images.length !== 0) {
    images.forEach((ele, i, arr) => {
      if (ele.getAttribute('alt') === 'left') {
        $('#slides').removeClass('narrow');
        $('#slides').addClass('wide');
        $('p').addClass('pwide');
        console.log('We ave an image that wants to be left aligned');
      } else {
        $('#slides').removeClass('wide');
        $('#slides').addClass('narrow');
        $('p').removeClass('pwide');

      }
    });
  } else {
    $('p').removeClass('pwide');
    $('#slides').removeClass('wide');
    $('#slides').addClass('narrow');
  }
}
