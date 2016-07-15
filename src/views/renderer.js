const {
  ipcRenderer
} = require('electron');
let content = null;
let currentSlide = 0;
let ids = ['comments', 'slides'];
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
function constrain (i, arr) {
  let ndx = null;
  if(i > arr.length - 1) {
    ndx = arr.length - 1;
  }else{
    ndx = i;
  }
  return ndx;
}

function setContent () {

  ids.forEach((ele, index, array) => {
    let element = document.getElementById(ele); // eslint-disable-line no-undef
    if (element !== null) {
      console.log(`found ${ele} div`);
      if (ele === 'slides') {
        element.innerHTML = content.msg.slides[constrain(currentSlide, content.msg.slides)];
      } else if (ele === 'comments') {
        element.innerHTML = content.msg.comments[constrain(currentSlide, content.msg.comments)].comments;
      }
    }
  });
}

ipcRenderer.on('down', (event, arg) => {
  console.log(arg);
  increaseSlideNumber();
  setContent();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('up', (event, arg) => {
  console.log(arg);
  decreaseSlideNumber();
  setContent();
  // document.getElementByClassName('content')
  // .innerHTML = currentSlide;
});
ipcRenderer.on('update', (event, arg) => {
  content = arg;
  console.log(arg);
});
ipcRenderer.on('slides', (event, arg) => {
  console.log(arg);
  content = arg;
  setContent();
  // ids.forEach((ele, index, array) => {
  //   let element = document.getElementById(ele);
  //   if (element !== null) {
  //     console.log(`found ${ele} div`);
  //     if (ele === 'slides') {
  //       element.innerHTML = content.msg.slides[constrain(currentSlide, content.msg.slides)];
  //     } else if (ele === 'comments') {
  //       element.innerHTML = content.msg.comments[constrain(currentSlide, content.msg.comments)].comments;
  //     }
  //   }
  // });
});
