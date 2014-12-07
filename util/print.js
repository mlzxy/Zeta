/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var clc = require('cli-color');


var headline = function(s) {
    console.log(clc.black.bgWhite.bold(s));
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



exports.error = error;
exports.warn = warn;
exports.notice = notice;
exports.headline = headline;
