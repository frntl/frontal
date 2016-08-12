/* global window, document */
export function getComputedFontSize(ele) {
  let style = window.getComputedStyle(ele, null).getPropertyValue('font-size');
  let fontSize = parseFloat(style);
  return fontSize;
}
export function setFontSize(val, initVal, name) {
  let element = document.getElementById(name);
  if (element !== null) {
    let currentFontSize = getComputedFontSize(element);
    element.style.fontSize = initVal === null ? (currentFontSize + val) + 'px' : initVal + 'px';
  }
}
