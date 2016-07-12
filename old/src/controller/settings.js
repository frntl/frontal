import * as fs from 'fs';
import * as error from './error';

export var settings = {};
export var settings_path = null;

//Get Settings
export function get () {
	return settings;
};

//Get Settings Path
export function getPath () {
	return settings_path;
};

//Set Theme Folder
export function setThemeFolder (path) {
	settings.template_directory = path[0];
	updateSettings();
};

//Set Theme
export function setTheme (theme) {
	settings.last_template = theme;
	updateSettings();
};

export function updateSettings () {
	try {
		fs.writeFileSync(settings_path, JSON.stringify(settings), 'utf-8');
		error.error("settings saved:", settings_path);
	} catch (err) {
		error.error("Error writing to settings file: " + err);
		throw err;
	}
};

export function init (app) {

	settings_path = app.getPath('userData') + '/settings.json';

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
		settings = JSON.parse(data);
		error.error("Success, settings found:", settings);

	} catch (err) {
		//if error, then there was no settings file
		error.error("No settings found:", settings);
		try {
			//create file if not exists
			var fd = fs.openSync(settings_path, 'w+');

			//empty settings
			settings = {
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