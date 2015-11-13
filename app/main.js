'use strict';

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

//Presentation object
var presentation = {
	type: 'md|json',
	path: null,
	file: null,
	slides: null
};

var menu;

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
	global.settings_path = app.getPath('userData') + '/settings.json';

	//Load the settings
	//If settings file does not exist, create the settings file
	try {
		//WHERE SHOULD WE STORE THE SETTINGS? I guess on user level to support machines with multiple users?!
		//var settingsPath = app.getPath('appData') + '/settings.json';
		// I would suggest having a folder called
		// ~/.frontal on OSX and something similar on Windows and other *nix
		// distros
		// there we could store
		// ~/.frontal/themes
		// ~/.frontal/settings.json
		// and other things we need
		// the installation of themes for advanced users could then be
		// git clone git@github.com:sebastian-meier/frontal-theme-example.git ~/.frontal/themes/frontal-theme-example
		// for non terminal users the app could handle the installation
		// of themes and also have the possibility to keep themes up to date by using git
		//
		fs.openSync(global.settings_path, 'r+'); //throws error if file doesn't exist, continues after catch
		var data = fs.readFileSync(global.settings_path);
		global.settings = JSON.parse(data);
		global.error("Success, settings found:", global.settings);
	} catch (err) {
		//if error, then there was no settings file
		try {
			//create file if not exists
			var fd = fs.openSync(global.settings_path, 'w+');

			//empty settings
			global.settings = {
				"template_directory": null,
				"last_template": null
			};

			updateSettings();
		} catch (err) {
			//jshint ignore:line
			global.error("Error creating settings file:", err);
			throw err;
		}
	}

	themes.init();

	//initialize app
	initApp();
});

//!!TODO: KeyCommands (command+o, command+f, arrow keys, return key, space key, esc key), Menu Structure (), Settings?

global.updateSettings = function () {
	try {
		fs.writeFileSync(global.settings_path, JSON.stringify(global.settings), 'utf-8');
		global.error("settings saved:", global.settings_path);
	} catch (err) {
		global.error("Error writing to settings file: " + err);
		throw err;
	}
};

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
			console.log();
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

//Validate folder and open it
global.openFolder = function (path) {
	//Validate if selected folder contains all required elements for a frontal slide folder
	/*
 	We accept:
 		xyz.md
 		xyz.json
 		folder/xyz.md
 		folder/xyz.json
 	we do not accept:
 		folder/package.json
 */

	//Test if path is a folder
	var extension;
	if (fs.lstatSync(path).isDirectory()) {
		//Loop through the folder
		var presentation_file = null;
		fs.readdirSync(path).forEach(function (file) {
			//Ignore sub-folders
			if (!fs.lstatSync(path + '/' + file).isDirectory()) {
				//Ignore package and readme files (npm/git support)
				if (file.toLowerCase() !== 'package.json' && file.toLowerCase() !== 'readme.md') {
					extension = file.substring(file.lastIndexOf(".") + 1).toLowerCase();
					if (extension === 'md' || extension === 'json') {
						presentation_file = file;
					}
				}
			}
		});

		if (presentation_file !== null) {
			path = path + '/' + presentation_file;
		} else {
			global.error("No presentation file found in: ", path);
		}
	}

	if (fs.existsSync(path) && !fs.lstatSync(path).isDirectory()) {

		presentation.type = path.substring(path.lastIndexOf(".") + 1).toLowerCase();
		presentation.file = path.substring(path.lastIndexOf('/') + 1);
		presentation.path = path.substring(0, path.length - presentation.file.length);
		var presentation_data = fs.readFileSync(path);

		if (presentation.type === 'md') {
			presentation.slides = parser.md(presentation_data);
		} else if (presentation.type === 'json') {
			presentation.slides = parser.json(presentation_data);
		} else {
			global.error("Unsupported file type: ", path);
		}
	}

	console.log(presentation);

	//Set current slideshow path to this path
	//Switch to presentation mode if not already in presentation mode
};

//Set Theme Folder
global.setThemeFolder = function (path) {
	global.settings.template_directory = path[0];
	global.updateSettings();
};

//Set Theme
global.setTheme = function (theme) {
	global.settings.last_template = theme;
	global.updateSettings();
};

//GoTo a certain page
global.goTo = function (page) {
	mainWindow.loadUrl('file://' + __dirname + '/views/layouts/' + page + '.html');
};

//Load list of themes
global.getThemes = function () {
	return themes;
};

//Global error function
global.error = function (str, e) {

	var error_html = 'data:text/html;charset=UTF-8,' + encodeURIComponent('<!DOCTYPE html>' + '<html>' + '<head>' + '<meta charset="UTF-8">' + '<title>Error</title>' + '<link rel="stylesheet" type="text/css" href="css/popup.css">' + '</head>' + '<body>' + '<h1>' + str + '</h1>' + '<p>' + JSON.stringify(e) + '</p>' + '</body>' + '</html>');

	if (errorWindow === null) {
		errorWindow = new BrowserWindow({
			width: 400,
			height: 400,
			center: true,
			title: "Frontal:Error"
		});
	}

	errorWindow.loadUrl(error_html);

	errorWindow.on('closed', function () {
		errorWindow = null;
	});
};