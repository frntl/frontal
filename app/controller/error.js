'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.error_window = undefined;
exports.error = error;

var _browserWindow = require('browser-window');

var BrowserWindow = _interopRequireWildcard(_browserWindow);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var error_window = exports.error_window = null;

//Global error function
function error(str, e) {

	var error_html = 'data:text/html;charset=UTF-8,' + encodeURIComponent('<!DOCTYPE html>' + '<html>' + '<head>' + '<meta charset="UTF-8">' + '<title>Error</title>' + '<link rel="stylesheet" type="text/css" href="css/popup.css">' + '</head>' + '<body>' + '<h1>' + str + '</h1>' + '<p>' + JSON.stringify(e) + '</p>' + '</body>' + '</html>');

	if (error_window === null) {
		exports.error_window = error_window = new BrowserWindow({
			width: 400,
			height: 400,
			center: true,
			title: "Frontal:Error"
		});
	}

	error_window.loadUrl(error_html);

	error_window.on('closed', function () {
		exports.error_window = error_window = null;
	});
};