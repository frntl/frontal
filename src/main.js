/* jshint  esnext: true, esversion:6 */
var app = require('app'),
    dialog = require('dialog'),
    ElectronScreen,
    fs = require('fs'),
    swig = require('swig'),
    parser = require('./controller/parser'),
    themes = require('./controller/themes'),
    frontal = require('./controller/frontal'),
    settings = require('./controller/settings'),

//remote = require('remote'),
BrowserWindow = require('browser-window');

//Variable that knows if the app is ready yet
var ready = false; // ES6

//Variable contains a path to a folder if "open-file" event is called before ready
var preready = false;

//Path to settings file
global.settings_path = null;

//Main Window
var mainWindow = null;

//Note Window
var noteWindow = null;

//Note Window
var errorWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
		app.quit();
	}
});

//Somebody acticates the app (usually via tabbing or clicking the app icon)
app.on('activate', function (event, path) {
	if (mainWindow === null) {
		global.initApp();
	}
});


//Starting the presentation mode if somebody drops a valid folder onto the app icon
app.on('open-file', function (event, path) {
	//This event sometimes gets triggered before the ready event, so if app is not ready yet, initiate after ready
	if (ready) {
		global.openFolder(path);
	} else {
		preready = path;
	}
});

//App initialization
app.on('ready', function () {
	settings.init();

	themes.init();

	//initialize app
	initApp();

});

//!!TODO: KeyCommands (command+o, command+f, arrow keys, return key, space key, esc key), Menu Structure (), Settings?





global.initApp = function () {
	frontal.buildMenu(app);

	//MultiDisplay

	ElectronScreen = require('screen');
	var displays = ElectronScreen.getAllDisplays();
	//global.error('displays', displays);
	var externalDisplay = null;
	for (var i in displays) {
		if (displays[i].bounds.x !== 0 || displays[i].bounds.y !== 0) {
			externalDisplay = displays[i];
			break;
		}
	}

	if (externalDisplay) {
		noteWindow = new BrowserWindow({
			x: externalDisplay.bounds.x + 50,
			y: externalDisplay.bounds.y + 50,
			width: 200,
			height: 200,
			title: 'Frontal:Notes'
		});

		noteWindow.loadUrl('file://' + __dirname + '/views/layouts/notes.html');
	}

	ElectronScreen.on('display-added', function (event, newDisplay) {
		//Update Window Setup
	});

	ElectronScreen.on('display-removed', function (event, oldDisplay) {
		//Update Window Setup
	});

	ElectronScreen.on('display-metrics-changed', function (event, display, changedMetricts) {
		//Update Window Setup
	});

	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		x: 0,
		y: 0,
		title: "Frontal"
	});

	//mainWindow.openDevTools();

	mainWindow.loadUrl('file://' + __dirname + '/views/layouts/index.html');

	/*
 	var tpl = swig.compileFile(app.getPath('userData')+'/templates/index.html');
 mainWindow.loadUrl('data:text/html;charset=UTF-8,'+encodeURIComponent(tpl({ variable: 'Hello World'})));
 	*/

	mainWindow.on('closed', function () {
		mainWindow = null;
		//Close the comment window
	});

	//If somebody dropped a folder on the app icon to start the app
	if (preready !== false) {
		openFolder(preready);
	}
};

//GoTo a certain page
global.goTo = function (page) {
	mainWindow.loadUrl('file://' + __dirname + '/views/layouts/' + page + '.html');
};

//Load list of themes
global.getThemes = function () {
	return themes.get();
};