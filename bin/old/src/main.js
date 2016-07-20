/* jshint  esnext: true, esversion:6 */
var app = require('app'),
    interfaces = require('./controller/interfaces'),
    frontal = require('./controller/frontal');

frontal.init(app);