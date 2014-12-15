/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var defalta = {};



function initOptions() {
    this.circleCheck = true;
    this.root = process.cwd();
    this.public = "public";
    this.debug = true;
    this.serviceCache = false;
    this.loadinfo = false;
}




var equals = require('deep-equal');

var removeDefault = function(opt) {
    var nopt = {};
    for (var v in opt) {
        if (equals(opt[v], defalta[v]))
            continue;
        else
            nopt[v] = opt[v];
    }
    return nopt;
};


/*for default options*/
exports.initOptions = initOptions;
exports.removeDefault = removeDefault;
exports.circleCheck = 'circleCheck';
exports.serviceCache = 'serviceCache';