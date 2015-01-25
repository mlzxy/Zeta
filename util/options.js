/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var defalta = {};



function initOptions(m) {
    m.config('root', process.cwd());
    m.config('public', "public");
    m.config('debug', true);
    m.config('serviceCache', true);
    m.config('loadinfo', false);
    m.config('guard', false);
    m.config('globalDomain', false);
    m.config.of('built-in').of('static-server').val('indexFile', ['.html', '.htm', '.md']);
    m.config.of('built-in').of('static-server').val('processFun', {});
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