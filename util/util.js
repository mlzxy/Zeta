/*!
 * gliding2
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */

var _ = require('./patch.js');
var equals = require('deep-equal');
var print = require('./print.js');
var getArg = require('./arg.js');
var judge = require('./judge.js');
var clone = require('clone');




var quiteRequire = function(path) {

    try {
        var m = require(path);
        return m;
    } catch (e) {
        return undefined;
    }
};



var safeRequire = function(path) {
    try {
        var m = require(path);
        return m;
    } catch (e) {
        print.headline("Error Occur when loading modules");
        print.error("Message: " + e.message);
        print.headline("Stack traceback");
        console.log(e.stack);
        process.exit();
    }
};


var checkErr = function(t, msg) {
    if (t) {
        print.error(msg);
        throw new Error(msg);
    }

};



var safePut = function(place, key, val, where) {
    try {
        if (place === undefined)
            throw new Error("You Cound not assign to a undefined " + where + "!");
        if (place[key] === undefined)
            place[key] = val;
        else
            throw new Error("Override found in the " + where + ": " + key);
    } catch (e) {
        print.error(e.message);
    }
};
/*safeCopy is shallow*/
var safeCopy = function(x, y, msg) {
    if (msg === undefined)
        msg = '';
    for (var idx in y) {
        safePut(x, idx, y[idx], msg);
    }
    return x;
};




function updateOptions(a, b) {
    for (var v in b) {
        a[v] = b[v];
    }
    return a;
}



/*for pretty print*/
exports.error = print.error;
exports.warn = print.warn;
exports.notice = print.notice;
exports.headline = print.headline;

/*for get arguments*/
exports.argOf = getArg.getArguments;

/*for easy judge*/
exports.isFunction = judge.isFunction;
exports.isObject = judge.isObject;
exports.isString = judge.isString;
exports.isRegex = judge.isRegex;
exports.isHidden = judge.isHidden;
exports.isArray = Array.isArray;

/*compare two objects*/
exports.equals = equals;

/*copy object*/
exports.clone = clone;


/*more */
exports.updateOptions = updateOptions;

/*requires*/
exports.quiteRequire = quiteRequire;
exports.safeRequire = safeRequire;
exports.checkErr = checkErr;


/*assign with warning*/
exports.safePut = safePut;
exports.safeCopy = safeCopy;