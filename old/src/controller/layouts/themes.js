/*

This file contains all the functionality specific to the index.html (start page of the application)

*/

var remote = require('remote'),
	dialog = remote.require('dialog');

var getThemes = remote.getGlobal('getThemes');
var setTheme = remote.getGlobal('setTheme');
var goTo = remote.getGlobal('goTo');
var error = remote.getGlobal('error');

window.onload = function() {

	//GoTo Theme page
	document.getElementById('back').onclick = function (){
		goTo('index');
	}

	//Build Theme Page
	var container = document.getElementById('themes');
	var themes = getThemes();
	console.log(themes);
	themes.forEach(function(theme){
		var theme_str = '<div class="theme" id="'+theme.folder+'"';
		if(theme.hasImage){
			 theme_str += ' style="background-image:url(\''+theme.path+'/preview.png\');"';
		}
		theme_str += '><span class="name" id="'+theme.folder+'">'+theme.name+'</span><span class="version" id="'+theme.folder+'">'+theme.version+'</span><a id="'+theme.folder+'">use this theme &raquo;</a></div>';
		container.innerHTML += theme_str;
	});

	container.onclick = function(event){
		if(event.target.id !== 'themes'){
			setTheme(event.target.id);
			goTo('index');
		}
	};
};