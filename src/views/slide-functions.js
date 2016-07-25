// some slide specific functions
import {
  imagesLeft
} from './utils/images';
const $ = require('jquery');

// $(document).ready(()=>{

// });


$('#slides').bind('DOMSubtreeModified', imagesLeft);
// window.onload = () => {
//   // imagesLeft();
//   var insertedNodes = [];
//   let ele = document.querySelector('#slides');
//   if (ele !== null) {
//     // create an observer instance
//     let observer = new window.WebKitMutationObserver((mutationRecords) =>{
//       mutationRecords.forEach((mutationRecord)=> {
//         for (var i = 0; i < mutationRecord.addedNodes.length; i++) {
//                insertedNodes.push(mutation.addedNodes[i]);

//         }
//       });
//     });
//   observer.observe(ele, { childList: true });
//   console.log(insertedNodes);
//     // var config = {
//     //   attributes: true,
//     //   childList: true,
//     //   characterData: true
//     // };
//     // observer.observe(ele, config);
//     // later, you can stop observing
//     // observer.disconnect();
//   }
// };
