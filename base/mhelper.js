/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var myUtil = require('../util/util.js');
var print = require('../util/print.js');
var fs = require("fs");
var walk = require('walk');
var cfg = require('../util/config.js');

var P = /module\((\n|\ )*(\'|\")([^'"])*(\'|\")\,{0,1}(\n|\ )*\[{0,1}/;

var parseName = function(str) {
    var sl = str.match(P)[0];
    var p = "\"";
    if (sl.indexOf(p) == -1)
        p = "\'";
    var start = sl.indexOf(p) + 1,
        end = sl.lastIndexOf(p);
    var mname = sl.slice(start, end);
    return mname;
};




var init_mMap = function(root) {
    var mMap = {};
    var ff = function(root, stat, next) {
        var filename = root + '/' + stat.name;
        if (!myUtil.isHidden(filename) && filename.endsWith(".js")) {
            var source = fs.readFileSync(filename); //readFile, parse file, get name!
            var name = parseName(source.toString());
            if (name !== undefined)
                mMap[name] = filename;
        }
        next();
    };
    if (root !== undefined) {
        var walk_options = {
            listeners: {
                file: ff
            }
        };
        walk.walkSync(root || process.cwd(), walk_options);
        mMap = myUtil.updateObj(mMap, cfg.mBuiltin);
        return mMap;
    } else {
        return cfg.mBuiltin;
    }


};


/*-----------------------------------------------*/

var except = {
    config: 1,
    c: 1,
    init: 1,
    i: 1,
    load: 1,
    l: 1,
    name: 1,
    dependent: 1
};
var mergeModule = function(m1, m2) {
    for (var v in m2) {
        if (!except[v]) {
            m1[v] = m2[v];
        }
    }
    return m1;
};


var printCircle = function(idx, arr) {
    print.detail("It is detected in the module:" + arr[idx]);
    for (var i = idx; i < arr.length; i++) {
        print.detail("Module " + arr[i] + " depends on " + JSON.stringify(global.ngld[arr[i]].dependent));
    }
    console.log('\n');
};


var circle = function(name, arr) {
    var m = global.ngld[name];
    if (m === undefined) return;
    var deps = m.dependent;

    if (deps.length == 1 && deps[0] == cfg.buildin)
        deps = [];

    if (arr.indexOf(name) !== -1) { //circular
        var msg = "Circular dependency found in your modules!";
        print.error(msg);
        printCircle(arr.indexOf(name), arr);
        throw new Error(msg);
    }
    var narr; //continue to check
    for (var i = 0; i < deps.length; i++) {
        narr = arr.slice();
        narr.push(name);
        circle(deps[i], narr);
    }
};



var resetEnv = function(name) {
    var mMap = global.mMap;
    for (var n in mMap) {
        if (n != name) {
            var path = mMap[n];
            delete require.cache[require.resolve(path)];
        }
    }
    global.mMap = global.mOpt = global.mgld = global.ngld = undefined;
};




function updateOptions(a, b) {
    for (var v in b) {
        if (myUtil.isObject(b[v])) {
            a[v] = a[v] || {};
            updateOptions(a[v], b[v]);
        } else
            a[v] = b[v];
    }
    return a;
}


exports.init_mMap = init_mMap;
exports.mergeModule = mergeModule;
exports.circle = circle;
exports.resetEnv = resetEnv;
exports.updateOptions = updateOptions;