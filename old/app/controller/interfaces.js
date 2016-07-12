'use strict';

var Themes = require('./themes');
var Error = require('./error');
var Settings = require('./settings');
var Presentation = require('./presentation');
var Frontal = require('./frontal');

global.getThemes = Themes.get;
global.error = Error.error;
global.openFolder = Presentation.open;
global.setThemeFolder = Settings.setThemeFolder;
global.setTheme = Settings.setTheme;
global.goTo = Frontal.goTo;
global.settings = Settings.get;