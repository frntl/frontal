/* global window, document */
const $ = require('jquery');
const remote = require('electron').remote;
window.onload = () => {
  let config = remote.getGlobal('config');
  // console.log(config.get('showIntroOnStratup'));
  $('#check1').prop('checked', config.get('showIntroOnStratup'));
  $('#number1').prop('value', config.get('maxRecentFiles'));
  $('#prefs').submit((event)=>{
    let cb = $('#check1').prop('checked');
    let num = $('#number1').val();
    // console.log('values are', cb, num);
    config.set('showIntroOnStratup', cb);
    config.set('maxRecentFiles', num);
    event.preventDefault();
  });

};
