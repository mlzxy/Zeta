/*!
 * gliding2
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */

var _ = require('./patch.js');
var print = require('./print.js');
var getArg = require('./arg.js');
var judge = require('./judge.js');

var safeRequire = function(path) {
    try {
        var m = require(path);
    } catch (e) {
        print.headline("Error Occur when loading modules");
        print.error("Message: " + e.message);
        print.headline("Stack traceback");
        console.log(e.stack);
    }
};



function updateOptions(a, b) {
    for (var v in b) {
        a[v] = a[v] || b[v];
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



/*more */
exports.updateOptions = updateOptions;
exports.safeRequire = safeRequire;