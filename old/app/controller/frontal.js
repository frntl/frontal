'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.app = exports.mainWindow = exports.preready = exports.ready = exports.ElectronScreen = undefined;
exports.frontal = frontal;
exports.init = init;
exports.goTo = goTo;

var _menu = require('menu');

var Menu = _interopRequireWildcard(_menu);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//For some reason i cannot use the import function on all modules ?!
var Presentation = require('./presentation'); /*
                                              	there is already a package called app, so i called this module frontal
                                              	it will contain all the app initializing things
                                              */

var Themes = require('./themes');
var Settings = require('./settings');
var BrowserWindow = require('browser-window');

function frontal() {}

var ElectronScreen = exports.ElectronScreen = undefined;

//Variable that knows if the app is ready yet
var ready = exports.ready = false; // ES6

//Variable contains a path to a folder if "open-file" event is called before ready
var preready = exports.preready = false;

//Main Window
var mainWindow = exports.mainWindow = null;

//local reference to app (set through init(app))
var app = exports.app = null;

function init(global_app) {
	exports.app = app = global_app;

	//Initialize all the app event listeners

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
			initApp();
		}
	});

	//Starting the presentation mode if somebody drops a valid folder onto the app icon
	app.on('open-file', function (event, path) {
		//This event sometimes gets triggered before the ready event, so if app is not ready yet, initiate after ready
		if (ready) {
			Presentation.openFolder(path);
		} else {
			exports.preready = preready = path;
		}
	});

	//App initialization
	app.on('ready', function () {
		Settings.init(app);

		Themes.init();

		//initialize app
		initApp();
	});
}

function initApp() {
	buildMenu();

	//MultiDisplay
	//you need to require this after the app has been initialized (stupid package)
	exports.ElectronScreen = ElectronScreen = require('screen');
	var displays = ElectronScreen.getAllDisplays();
	//global.error('displays', displays);
	var externalDisplay = null;
	for (var i in displays) {
		if (displays[i].bounds.x !== 0 || displays[i].bounds.y !== 0) {
			externalDisplay = displays[i];
			break;
		}
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
	exports.mainWindow = mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		x: 0,
		y: 0,
		title: "Frontal"
	});

	//mainWindow.openDevTools();

	mainWindow.loadUrl('file://' + __dirname + '/../views/layouts/index.html');

	/*
 	var tpl = swig.compileFile(app.getPath('userData')+'/templates/index.html');
 	mainWindow.loadUrl('data:text/html;charset=UTF-8,'+encodeURIComponent(tpl({ variable: 'Hello World'})));
 	*/

	mainWindow.on('closed', function () {
		exports.mainWindow = mainWindow = null;
		//Close the comment window
	});

	//If somebody dropped a folder on the app icon to start the app
	if (preready !== false) {
		Presentation.openFolder(preready);
	}
};

//GoTo a certain page
function goTo(page) {
	mainWindow.loadUrl('file://' + __dirname + '/../views/layouts/' + page + '.html');
};

/*-------------------- Menu --------------------*/

var menuTemplate = [{
	label: 'Edit',
	submenu: [{
		label: 'Undo',
		accelerator: 'CmdOrCtr+Z',
		role: 'undo'
	}, {
		label: 'Redo',
		accelerator: 'Shift+CmdOrCtr+Z',
		role: 'redo'
	}, {
		type: 'separator'
	}, {
		label: 'Cut',
		accelerator: 'CmdOrCtr+X',
		role: 'cut'
	}, {
		label: 'Copy',
		accelerator: 'CmdOrCtr+C',
		role: 'copy'
	}, {
		label: 'Pase',
		accelerator: 'CmdOrCtr+V',
		role: 'paste'
	}, {
		label: 'Select All',
		accelerator: 'CmdOrCtr+A',
		role: 'selectall'
	}]
}, {
	label: 'View',
	submenu: [{
		label: 'Toggle Full Screen',
		accelerator: function () {
			if (process.platform == 'darwin') {
				return 'Ctrl+Command+F';
			} else {
				return 'F11';
			}
		}(),
		click: function click(item, focusedWindow) {
			/*if(focusedWindow){
   				focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
   }*/

			//For this to work on OS X you need to go to System Preferences > Spaces > Enable different spaces for external displays, otherwise you will get a black screen on the second display
			if (mainWindow) {
				var state = true;
				if (mainWindow.isFullScreen()) {
					state = false;
				}
				mainWindow.setFullScreen(state);
				if (noteWindow) {
					//Make sure the note window is on the secondary display
					noteWindow.setFullScreen(state);
				}
			}
		}
	}, {
		label: 'Toggle Developer Tools',
		accelerator: function () {
			if (process.platform == 'darwin') {
				return 'Alt+Command+I';
			} else {
				return 'Ctrl+Shift+I';
			}
		}(),
		click: function click(item, focusedWindow) {
			if (focusedWindow) {
				focusedWindow.toggleDevTools();
			}
		}
	}]
}, {
	label: 'Window',
	role: 'window',
	submenu: [{
		label: 'Minimize',
		accelerator: 'CmdOrCtrl+M',
		role: 'minimize'
	}, {
		label: 'Close',
		accelerator: 'CmdOrCtrl+W',
		role: 'close'
	}]
}];

function buildMenu() {
	//If this app is a mac app, we add the standard first menu point containing the about stuff
	if (process.platform == 'darwin') {
		var name = app.getName();
		menuTemplate.unshift({
			label: name,
			submenu: [{
				label: 'About ' + name,
				role: 'about'
			}, {
				type: 'separator'
			}, {
				label: 'Services',
				role: 'services',
				submenu: []
			}, {
				label: 'Hide ' + name,
				accelerator: 'Command+H',
				role: 'hide'
			}, {
				label: 'Hide Others',
				accelerator: 'Command+Shift+H',
				role: 'hideothers'
			}, {
				label: 'Show All',
				role: 'unhide'
			}, {
				type: 'separator'
			}, {
				label: 'Quit',
				accelerator: 'Command+Q',
				click: function click() {
					app.quit();
				}
			}]
		});

		//Add mac os x specific window command
		menuTemplate[3].submenu.push({
			type: 'separator'
		}, {
			label: 'Bring All to Front',
			role: 'front'
		});
	}

	//Activate the menu
	var menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}