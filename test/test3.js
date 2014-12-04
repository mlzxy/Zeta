var gld = require('../module/mgld.js');
var md = gld.module('mz', ['m1', 'm2']);

md.config("test", false);
debugger;
md.load();

exports = md;