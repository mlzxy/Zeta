/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
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





var firstErr = true;
var resetEnv = function() {
    global.mMap = global.mOpt = global.mgld = global.ngld = undefined;
};
var safeRequire = function(path) {
    try {
        var m = require(path);
        return m;
    } catch (e) {
        if (firstErr) {
            firstErr = false;
            print.headline("Stack traceback");
            console.log(e.stack);
            resetEnv();
            throw e;
        } else {
            throw e;
        }
    }
};


var checkErr = function(t, msg) {
    if (t) {
        print.error(msg);
        throw new Error(msg);
    }

};



function updateObj(a, b) {
    for (var v in b) {
        a[v] = b[v];
    }
    return a;
}


var invalidate = function() {
    for (var i = 0; i < arguments.length; i++)
        delete require.cache[require.resolve(arguments[i])];
};


var getAttr = function(dict, keyArray, idx) {
    if (idx === undefined)
        idx = 0;
    if (!judge.isObject(dict))
        return dict;
    else if (idx == keyArray.length - 1)
        return dict[keyArray[idx]];
    else
        return getAttr(dict[keyArray[idx]], keyArray, idx + 1);
};


var setAttr = function(dict, keyArray, val) {
    if (judge.isObject(dict)) {
        for (var i = 0; i < keyArray.length - 1; i++) {
            if (dict[keyArray[i]] === undefined)
                dict[keyArray[i]] = {};
            /*=========================================*/
            if (judge.isObject(dict[keyArray[i]])) {
                dict = dict[keyArray[i]];
            } else {
                break;
            }
        }
        dict[keyArray[keyArray.length - 1]] = val;
    }
};



/*for get arguments*/
exports.argOf = getArg.getArguments;

/*for easy judge*/
exports.isFunction = judge.isFunction;
exports.isObject = judge.isObject;
exports.isString = judge.isString;
exports.isRegex = judge.isRegex;
exports.isHidden = judge.isHidden;
exports.isArray = judge.isArray;
exports.isNumber = judge.isNumber;
/*compare two objects*/
exports.equals = equals;

/*copy object*/
exports.clone = clone;


/*more */
exports.updateObj = updateObj;

/*requires*/
exports.quiteRequire = quiteRequire;
exports.safeRequire = safeRequire;
exports.checkErr = checkErr;
exports.invalidate = invalidate;


/*set get Attr*/
exports.setAttr = setAttr;
exports.getAttr = getAttr;