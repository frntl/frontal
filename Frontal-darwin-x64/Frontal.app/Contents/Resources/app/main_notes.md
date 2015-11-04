//Copy the whole template folder to a temporary folder within the app

//Option to disable template javascript


//Predefine some default variable names:
/*

slide variables

	- title
	- subtitle
	- content
	- footnote
	- image
	- embed (if not embeddable, load url in iframe (>iframe_template))
	- images (?)

global variables (can be overwritten on a per slide basis)

	- global_title
	- global_subtitle
	- global_author
	- global_affiliation
	- global_date

automatic variables

	- current_date
	- current_page
	- number_of_pages
	- 


var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

//!TODO ADD MENU BAR COMMANDS (NEW WINDOW, OPEN, SETTINGS)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
		app.quit();
	}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		x:0,
		y:0,
		title:"Presentr"
/*
width Integer - Window's width.
height Integer - Window's height.

x Integer - Window's left offset from screen.
y Integer - Window's top offset from screen.

use-content-size Boolean - The width and height would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger.

center Boolean - Show window in the center of the screen.

min-width Integer - Window's minimum width.
min-height Integer - Window's minimum height.
max-width Integer - Window's maximum width.
max-height Integer - Window's maximum height.

resizable Boolean - Whether window is resizable.

always-on-top Boolean - Whether the window should always stay on top of other windows.

fullscreen Boolean - Whether the window should show in fullscreen. When set to false the fullscreen button will be hidden or disabled on OS X.

skip-taskbar Boolean - Whether to show the window in taskbar.

kiosk Boolean - The kiosk mode.

title String - Default window title.

icon NativeImage - The window icon, when omitted on Windows the executable's icon would be used as window icon.
show Boolean - Whether window should be shown when created.
frame Boolean - Specify false to create a Frameless Window.
accept-first-mouse Boolean - Whether the web view accepts a single mouse-down event that simultaneously activates the window.
disable-auto-hide-cursor Boolean - Whether to hide cursor when typing.
auto-hide-menu-bar Boolean - Auto hide the menu bar unless the Alt key is pressed.
enable-larger-than-screen Boolean - Enable the window to be resized larger than screen.
background-color String - Window's background color as Hexadecimal value, like #66CD00 or #FFF. This is only implemented on Linux and Windows.
dark-theme Boolean - Forces using dark theme for the window, only works on some GTK+3 desktop environments.
transparent Boolean - Makes the window transparent.
type String - Specifies the type of the window, possible types are desktop, dock, toolbar, splash, notification. This only works on Linux.
standard-window Boolean - Uses the OS X's standard window instead of the textured window. Defaults to true.
title-bar-style String, OS X - specifies the style of window title bar. This option is supported on OS X 10.10 Yosemite and newer. There are three possible values:
	default or not specified results in the standard gray opaque Mac title bar.
	hidden results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
	hidden-inset results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
web-preferences Object - Settings of web page's features, properties:
	node-integration Boolean - Whether node integration is enabled. Default is true.
	preload String - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on for the page, and the path of preload script has to be absolute path.
	partition String - Sets the session used by the page. If partition starts with persist:, the page will use a persistent session available to all pages in the app with the same partition. if there is no persist: prefix, the page will use an in-memory session. By assigning the same partition, multiple pages can share the same session. If the partition is unset then default session of the app will be used.
	zoom-factor Number - The default zoom factor of the page, 3.0 represents 300%.
	javascript Boolean
	web-security Boolean - When setting false, it will disable the same-origin policy (Usually using testing websites by people), and set allow_displaying_insecure_content and allow_running_insecure_content to true if these two options are not set by user.
	allow-displaying-insecure-content Boolean - Allow an https page to display content like images from http URLs.
	allow-running-insecure-content Boolean - Allow a https page to run JavaScript, CSS or plugins from http URLs.
	images Boolean
	java Boolean
	text-areas-are-resizable Boolean
	webgl Boolean
	webaudio Boolean
	plugins Boolean - Whether plugins should be enabled.
	experimental-features Boolean
	experimental-canvas-features Boolean
	overlay-scrollbars Boolean
	overlay-fullscreen-video Boolean
	shared-worker Boolean
	direct-write Boolean - Whether the DirectWrite font rendering system on Windows is enabled.
	page-visibility

*/

	});

	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;

	});
});


//Watch folder for changes
//jsonObject = require('file:///C:/folder/blah.json')
/*

//Refresh (command+r and f5) > stay on the same page after reload
//DETECT FILE CHANGE AND RELOAD WOULD BE NICE!!!

//atom shell > openDirectory (openFile) (Directory chooser)
/*var dialog = require('dialog');
console.log(dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]}));*/


/*

CONFIG FILE


//Folder to newPath
var newPath = dialog.showOpenDialog({ title: 'Please select a folder', defaultPath: app.getPath('userDesktop'), properties: [ 'openDirectory', 'createDirectory']});


Example of saving to file:

try {
    fs.writeFileSync(app.getPath('userData') + '/settings.json', angular.toJson($rootScope.settings) , 'utf-8');
    console.log('Saved settings!');
  } catch (err) {
    throw err;
  }

*/

//Switch theme while slideshow is selected > keep settings screen open > change after selection (show play/fullscreen button)

//Theme boilerplate with thumbnail png > select thumbnail from list

//Preload required templates

//Global error function with error popup

//frontal: footer code highlighting, header templates iframe

/*




*/