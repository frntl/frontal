/*

This file contains all the functionality specific to the index.html (start page of the application)

*/

var remote = require('remote'),
	dialog = remote.require('dialog');

var openFolder = remote.getGlobal('openFolder');

window.onload = function() {

	//Folder Drop Functionality for IntroScreen
	var holder = document.getElementById('drop-area');
	
	holder.ondragover = function () {
		return false;
	};

	holder.ondragleave = holder.ondragend = function () {
		return false;
	};

	holder.ondrop = function (e) {
		e.preventDefault();
		var file = e.dataTransfer.files[0];
		openFolder(file.path);
		return false;
	};

	//Apparently sometimes when you drop stuff on the window it will load the dropped element instead of handling the drop event
	document.addEventListener('dragover',function(event){
		event.preventDefault();
		return false;
	},false);

	document.addEventListener('drop',function(event){
		event.preventDefault();
		return false;
	},false);

	//Traditional select folder functionality
	var selectBtn = document.getElementById('frontal-button');

	selectBtn.onclick = function (){
		openFolder(dialog.showOpenDialog({ properties: [ 'openDirectory' ]}));
	}
};