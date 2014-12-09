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

var hzline = function() {
    console.log('\n');
    console.log(clc.bgBlue('\n'));
    console.log('\n');
};


exports.error = error;
exports.warn = warn;
exports.notice = notice;
exports.headline = headline;
exports.hzline = hzline;