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
        element.innerHTML = content.msg[constrain(currentSlide, content.msg)].slide;
      } else if (ele === 'comments') {
        element.innerHTML = content.msg[constrain(currentSlide, content.msg)].comments;
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

ipcRenderer.on('switch-theme', (event, arg)=>{
  console.log(arg);
});

function changeCSS(cssFilePath, cssLinkIndex) {
  let oldLink = document.getElementsByTagName('link').item(cssLinkIndex); // eslint-disable-line no-undef
  let newLink = document.createElement('link'); // eslint-disable-line no-undef
  newLink.setAttribute('rel', 'stylesheet');
  newLink.setAttribute('type', 'text/css');
  newLink.setAttribute('href', cssFilePath);
  document.getElementsByTagName('head').item(0).replaceChild(newLink, oldLink); // eslint-disable-line no-undef
}

