/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var myUtil = require('../util/util.js');
var fs = require("fs");
var walk = require('walk');


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
    var walk_options = {
        listeners: {
            file: ff
        }
    };
    walk.walkSync(root || process.cwd(), walk_options);
    return mMap;
};


/*-----------------------------------------------*/

var except = {
    config: 1,
    init: 1,
    save: 1,
    load: 1,
    name: 1,
    dependent: 1
};
var mergeModule = function(m1, m2) {
    for (var v in m2) {
        if (!except[v]) {
            m1[v] = m2[v];
        }
    }
    var s1 = m1.save,
        s2 = m2.save;
    for (var u in s2) {
        if (s1[u] === undefined)
            s1[u] = {};
        myUtil.safeCopy(s1[u], s2[u], "between " + m1.name + " and " + m2.name + " "); //the safeCopy is shallow
    }
    return m1;
};

exports.init_mMap = init_mMap;
exports.mergeModule = mergeModule;
