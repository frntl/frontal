'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.settings_path = exports.settings = undefined;
exports.get = get;
exports.getPath = getPath;
exports.setThemeFolder = setThemeFolder;
exports.setTheme = setTheme;
exports.updateSettings = updateSettings;
exports.init = init;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _error = require('./error');

var error = _interopRequireWildcard(_error);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var settings = exports.settings = {};
var settings_path = exports.settings_path = null;

//Get Settings
function get() {
	return settings;
};

//Get Settings Path
function getPath() {
	return settings_path;
};

//Set Theme Folder
function setThemeFolder(path) {
	settings.template_directory = path[0];
	updateSettings();
};

//Set Theme
function setTheme(theme) {
	settings.last_template = theme;
	updateSettings();
};

function updateSettings() {
	try {
		fs.writeFileSync(settings_path, JSON.stringify(global.settings), 'utf-8');
		error.error("settings saved:", settings_path);
	} catch (err) {
		error.error("Error writing to settings file: " + err);
		throw err;
	}
};

function init(app) {

	exports.settings_path = settings_path = app.getPath('userData') + '/settings.json';

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
		fs.openSync(settings_path, 'r+'); //throws error if file doesn't exist, continues after catch
		var data = fs.readFileSync(settings_path);
		exports.settings = settings = JSON.parse(data);
		error.error("Success, settings found:", settings);
	} catch (err) {
		//if error, then there was no settings file
		try {
			//create file if not exists
			var fd = fs.openSync(settings_path, 'w+');

			//empty settings
			exports.settings = settings = {
				"template_directory": null,
				"last_template": null
			};

			updateSettings();
		} catch (err) {
			//jshint ignore:line
			error.error("Error creating settings file:", err);
			throw err;
		}
	}
}