/*!
 * gliding2
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */



String.prototype.startsWith = function(str) {
    return this.indexOf(str) === 0;
};
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.endsWithArray = function(arr) {
    for (var v = 0; v < arr.length; v++)
        if (this.endsWith(arr[v]))
            return true;
    return false;
};

Array.prototype.removeIndexAt = function(idx) {
    return this.slice(0, idx).concat(this.slice(idx + 1));
};

//////////////////////////////////////////////////////////////////

function mergeOptions(a, b) {
    for (var v in b) {
        a[v] = a[v] || b[v];
    }
    return a;
}

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function isObject(obj) {
    return typeof obj == 'object';
}

function isString(obj) {
    return typeof obj == 'string';
}

function isRegex(obj) {
    return obj instanceof RegExp;
}

var isHidden = function(path) {
    return (/(^|.\/)\.+[^\/\.]/g).test(path) || (/~$/).test(path);
};

//////////////////////////////////////////////////////////////////////////////

var P = /\((.|\n|\t)*\)\ *\{/;
var getArguments = function(f) {
    var source = f.toString();
    var argStr = source.match(P);
    var arg = removeALL(argStr[0], '(', ')', ' ', '\n', '\t', '{');
    arg = arg.split(',');
    for (var s = 0; s < arg.length; s++)
        arg[s] = arg[s].trim();
    return arg;
};

var remove = function(str, c) {
    return str.replace(c, '');
};

var removeALL = function(str) {
    var t = str,
        i = 1;
    while (i < arguments.length) {
        t = remove(t, arguments[i]);
        i = i + 1;
    }
    return t;
};

///////////////////////////////////////////////////////////////////
var clc = require('cli-color');
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;
/////////////////////////////////////////////////////////

var errorPrint = function(s) {
    console.log(error(s));
};

var warnPrint = function(s) {
    console.log(warn(s));
};

var noticePrint = function(s) {
    console.log(notice(s));
};

/////////////////////////////////////
exports.error = errorPrint;
exports.warn = warnPrint;
exports.notice = noticePrint;
/////////////////////////////////////
exports.getArguments = getArguments;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.mergeOptions = mergeOptions;
exports.isString = isString;
exports.isRegex = isRegex;
exports.isHidden = isHidden;
////////////////////////////////////