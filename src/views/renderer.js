const {
  ipcRenderer
} = require('electron');
let content = null;
let currentSlide = 0;
export function renderer() {}

function increaseSlideNumber() {
  currentSlide++;
}

function decreaseSlideNumber() {
  if (currentSlide === 0) {
    currentSlide = 0;
  } else {
    currentSlide--;
  }
}
ipcRenderer.on('down', (event, arg) => {
  console.log(arg);
  increaseSlideNumber();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('up', (event, arg) => {
  console.log(arg);
  decreaseSlideNumber();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('update', (event, arg) => {
  content = arg;
  console.log(arg);
});
ipcRenderer.on('slides', (event, arg) => {
  content = arg;
  console.log(content);
  let ids = ['comments', 'slides'];
  ids.forEach((ele, index, array) => {
    let element = document.getElementById(ele);
    if (element !== null) {
      console.log(`found ${ele} div`);
      if (ele === 'slides') {
        element.innerHTML = content.msg.slides[0];
      } else if (ele === 'comments') {
        element.innerHTML = content.msg.comments[0].comments;
      }
    }
  });
});
