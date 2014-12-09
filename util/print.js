/*!
 * gliding
 * Copyright(c) 2014-2015 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */

var clc = require('cli-color');
var cfg = require('./config.js');


var headline = function(s) {
    console.log('[' + clc.red(s) + ']');
};


var detail = function(s) {
    console.log('[' + clc.cyan('detail') + ']  ' + clc.yellowBright(s));
};

var error = function(s) {
    console.log('[' + clc.red('error') + ']   ' + clc.magenta(s));
};

var warn = function(s) {
    console.log('[' + clc.yellow('warn') + ']  ' + s);
};

var notice = function(s) {
    console.log('[' + clc.blue('notice') + ']  ' + s);
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


var goNext = function(name) {
    console.log('[' + clc.cyan('handler') + ']' + mtab(2) + "go to " + clc.bold.blue(name));
};

var ok = function(msg) {
    console.log("[" + clc.green("ok") + "] " + msg);
};

var preq = clc.yellow;
var request = function(obj) {
    console.log("[" + clc.green('request') + "] " + "from ip: " + preq(obj.ip) + ", method: " + preq(obj.method) + ", on path:" + preq(obj.path));
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
exports.detail = detail;