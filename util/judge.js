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


exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isString = isString;
exports.isRegex = isRegex;
exports.isHidden = isHidden;