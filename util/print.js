/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var clc = require('cli-color');


var headline = function(s) {
    console.log(clc.blackBright.bgCyanBright.bold(s));
};

var error = function(s) {
    console.log(clc.red.bold(s));
};

var warn = function(s) {
    console.log(clc.yellow(s));
};

var notice = function(s) {
    console.log(clc.blue(s));
};

var hzline = function() {
    console.log('\n');
    console.log(clc.bgBlue('\n'));
    console.log('\n');
};

var tab = '	';
var mtab = function(n) {
    var x = '';
    for (var i = 0; i < n; i++)
        x = x + tab;
    return x;
};

var finish = function(m, ti) {
    var tistr = String(ti);
    var msg = "The Main Module: " + clc.red(m.name) + " gets loaded successfully in " + clc.green(tistr) + " ms.";
    console.log("[" + clc.green("ok") + "] " + msg);
    console.log('');
};

var loaded = function(m) {
    console.log("[" + clc.green("loaded") + "]  Module: " + clc.blue(m.name));
};

var loading = function(m) {
    console.log("[" + clc.yellow("loading") + "] Module: " + clc.blue(m.name) + ", who depends on " + clc.blue(JSON.stringify(m.dependent)));
};




exports.error = error;
exports.warn = warn;
exports.notice = notice;
exports.headline = headline;
exports.hzline = hzline;
exports.mtab = mtab;
exports.finish = finish;
exports.loaded = loaded;
exports.loading = loading;