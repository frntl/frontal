'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.presentation = undefined;
exports.open = open;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//Presentation object
var presentation = exports.presentation = {
	type: 'md|json',
	path: null,
	file: null,
	slides: null
};

//Validate folder and open it
function open(path) {
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

//The note window is only required in presentation mode, so either manage it in presentation module or create a seperate note module
//Note Window
/*var noteWindow = null;

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
*/