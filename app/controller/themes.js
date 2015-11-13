'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.data = undefined;
exports.themes = themes;
exports.init = init;
exports.get = get;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _helper = require('./helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 *
 * constructor
 */
function themes() {
	// nothing her yet
};

/**
 *
 * array containing the themes in the theme folder
 */
var data = exports.data = [];

/**
 *
 * check if the template_directory is set, if set, parse the folder and populate the theme-array
 */
function init() {
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
function get() {
	return data;
}