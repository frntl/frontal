/* global document, window*/
const isEmpty = require('lodash.isempty');

export function setHeaderFooter(html, name) {
  let elementsHTMLCollection = document.getElementsByTagName(name);
  let elements = Array.from(elementsHTMLCollection);
  elements.forEach((ele, i, arr) => {
    ele.innerHTML = html;
  });
}

export function setAttributes(attr, currentSlide, numberOfSlides) {
    // console.log(attr);
  if (isEmpty(attr) === true) {
    console.log('attributes are empty');
    setHeaderFooter('', 'footer');
    setHeaderFooter('', 'header');
    return;
  }
  if (attr !== null) {
    if ('footer' in attr) {
      let num = '';
      if('slide_numbering' in attr) {
        num = `${currentSlide}/${numberOfSlides}`;
      }
      setHeaderFooter(attr.slide_numbering === true ? `${num} || ${attr.footer}` : `${attr.footer}`, 'footer');
    }else {
      setHeaderFooter('', 'footer');

    }
    if ('header' in attr) {
      setHeaderFooter(attr.header, 'header');
    }else{
      setHeaderFooter('', 'header');

    }
  }
}
