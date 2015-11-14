import * as fs from 'fs';
import * as Helper from './helper';
import * as Settings from './settings';

/**
 *
 * constructor
 */
export function themes (){
  // nothing her yet
};

/**
 *
 * array containing the themes in the theme folder
 */
export var data = [];

/**
 *
 * check if the template_directory is set, if set, parse the folder and populate the theme-array
 */
export function init () {
	//Load themes
	if (Settings.get().template_directory !== null) {
		fs.readdirSync(Settings.get().template_directory).forEach(function (file) {
			if (fs.lstatSync(Settings.get().template_directory + '/' + file).isDirectory()) {
				var theme = {
					folder: file,
					path: Settings.get().template_directory + '/' + file,
					name: file,
					version: 'nan',
					hasImage: false
				};
				if (fs.existsSync(Settings.get().template_directory + '/' + file + '/preview.png')) {
					theme.hasImage = true;
				}
				if (fs.existsSync(Settings.get().template_directory + '/' + file + '/package.json')) {
					var json = JSON.parse(fs.readFileSync(Settings.get().template_directory + '/' + file + '/package.json'));
					theme = Helper.extend(theme, json);
				}
				data.push(theme);
			}
		});
	}
}

/**
 *
 * @return theme data
 */
export function get () {
	return data;
}