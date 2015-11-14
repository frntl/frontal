'use strict';

var Themes = require('./themes');
var Error = require('./error');

global.getThemes = Themes.get;
global.error = Error.error;