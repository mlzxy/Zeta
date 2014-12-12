/*!
 * zeta
 * Copyright(c) 2014-2015 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */

var clc = require('cli-color');
var cfg = require('./config.js');
var myUtil = require('./util.js');


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
    console.log('[' + clc.yellowBright('warning') + '] ' + clc.magentaBright(s));
};

var notice = function(s) {
    console.log('[' + clc.blue('notice') + ']  ' + clc.whiteBright(s));
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
    var msg = "The Main Module: " + clc.red(m.name) + " , all dependencies get loaded successfully in " + clc.green(tistr) + " ms.";
    console.log("[" + clc.green("ok") + "] " + msg);
    console.log('');
    console.log("[" + clc.yellow("loading") + "] Now start to load the components inside the Main Module: " + clc.red(m.name));
};

var mainOk = function(m) {
    var msg = "The Main Module: " + clc.red(m.name) + " , gets loaded successfully.";
    console.log("[" + clc.green("ok") + "] " + msg);
    console.log('');
};


var loaded = function(m) {
    console.log("[" + clc.green("loaded") + "]  Module: " + clc.blue(m.name));
};

var loading = function(m) {
    if (myUtil.isString(m))
        console.log("[" + clc.yellow("loading") + "] " + m);
    else
        console.log("[" + clc.yellow("loading") + "] Module: " + clc.blue(m.name) + ", who depends on " + clc.blue(JSON.stringify(m.dependent)));
};


var goNext = function(name) {
    console.log('[' + clc.cyan('handler') + ']' + mtab(1) + "   --- {" + clc.bold.blue(name) + "} ---");
};

var ok = function(msg) {
    console.log("[" + clc.green("ok") + "] " + msg);
};

var preq = clc.yellow;
var request = function(obj) {
    console.log("\n[" + clc.green('request') + "] " + "from ip: " + preq(obj.ip) + ", method: " + preq(obj.method) + ", on path:" + preq(obj.path));
};


var sopt = function(x, opt) {
    console.log('[' + clc.blue('notice') + ']  You have turned' + " the " + clc.blue(opt) + " option " + clc.blueBright(x) + ".");
};
var options = function(optset) {
    for (var v in optset) {
        switch (optset[v]) {

            case true:
                sopt('on', v);
                break;
            case null:
            case undefined:
            case false:
                sopt('off', v);
                break;
            default:
                sopt(JSON.stringify(optset[v]), v);
                break;
        }
    }
};



var listen = function(obj) {
    console.log('[' + clc.green('listening') + '] ' + 'The server is now listening on the ' + clc.blue(obj.address + ':' + String(obj.port)) + '\n');
};



var close = function(s) {
    console.log('[' + clc.green('closed') + '] ' + s);
};


var terminate = function(serverResponse) {
    console.log('[' + clc.red('terminated') + ']  the request has been terminated.');
};

var requestend = function(obj, t) {
    console.log("[" + clc.green('finished') + "] " + "request finish from ip: " + preq(obj.ip) + ", method: " + preq(obj.method) + ", on path:" + preq(obj.path) + " in " + clc.green(String(t)) + " ms\n");
};


exports.requestend = requestend;
exports.terminate = terminate;
exports.close = close;
exports.ok = ok;
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
exports.mainOk = mainOk;
exports.options = options;
exports.listen = listen;
exports.request = request;
exports.goNext = goNext;