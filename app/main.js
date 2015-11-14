'use strict';

/* jshint  esnext: true, esversion:6 */
var app = require('app'),
    frontal = require('./controller/frontal');

frontal.init(app);