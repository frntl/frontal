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
  if(currentSlide === 0){
    currentSlide = 0;
  }else{
    currentSlide--;
  }
}
ipcRenderer.on('down', (event, arg) => {
  console.log(arg);
  increaseSlideNumber();
  document.getElementById('content').innerHTML = currentSlide;
});
ipcRenderer.on('up', (event, arg) => {
  console.log(arg);
  decreaseSlideNumber();
  document.getElementById('content').innerHTML = currentSlide;

});
ipcRenderer.on('update', (event, arg) => {
  content = arg;
  console.log(arg);
});
