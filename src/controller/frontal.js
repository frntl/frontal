/*
	there is already a package called app, so i called this module frontal
	it will contain all the app initializing things
*/

import * as Menu from 'menu';

export function frontal (){

}

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
		accelerator: (function () {
			if (process.platform == 'darwin') {
				return 'Ctrl+Command+F';
			} else {
				return 'F11';
			}
		})(),
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
		accelerator: (function () {
			if (process.platform == 'darwin') {
				return 'Alt+Command+I';
			} else {
				return 'Ctrl+Shift+I';
			}
		})(),
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

export function buildMenu (app){
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