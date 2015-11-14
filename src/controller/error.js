import * as BrowserWindow from 'browser-window';

export var error_window = null;

//Global error function
export function error (str, e) {

	var error_html = 'data:text/html;charset=UTF-8,' + encodeURIComponent('<!DOCTYPE html>' +
		'<html>' +
			'<head>' +
				'<meta charset="UTF-8">' +
				'<title>Error</title>' +
				'<link rel="stylesheet" type="text/css" href="css/popup.css">' +
			'</head>' +
			'<body>' +
				'<h1>' + str + '</h1>' +
				'<p>' + JSON.stringify(e) + '</p>' +
			'</body>' +
		'</html>');

	if (error_window === null) {
		error_window = new BrowserWindow({
			width: 400,
			height: 400,
			center: true,
			title: "Frontal:Error"
		});
	}

	error_window.loadUrl(error_html);

	error_window.on('closed', function () {
		error_window = null;
	});
};