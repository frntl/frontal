import * as fs from 'fs';
import * as helper from './helper';

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
	if (global.settings.template_directory !== null) {
		fs.readdirSync(global.settings.template_directory).forEach(function (file) {
			if (fs.lstatSync(global.settings.template_directory + '/' + file).isDirectory()) {
				var theme = {
					folder: file,
					path: global.settings.template_directory + '/' + file,
					name: file,
					version: 'nan',
					hasImage: false
				};
				if (fs.existsSync(global.settings.template_directory + '/' + file + '/preview.png')) {
					theme.hasImage = true;
				}
				if (fs.existsSync(global.settings.template_directory + '/' + file + '/package.json')) {
					var json = JSON.parse(fs.readFileSync(global.settings.template_directory + '/' + file + '/package.json'));
					theme = helper.extend(theme, json);
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