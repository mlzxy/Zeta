/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var util = require('util');

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function isObject(obj) {
    return typeof obj == 'object' || util.isArray(obj);
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

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isString = isString;
exports.isRegex = isRegex;
exports.isHidden = isHidden;
exports.isNumber = isNumber;
exports.isArray = util.isArray;