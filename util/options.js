/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var defalta_options = {};


var cp = require('./compare.js');

var removeDefault = function(opt) {
    for (var v in opt) {
        if (cp.equals(opt[v], defalta_options[v]))
            opt[v] = undefined;
        else
            continue;
    }
    return opt;
};


/*for default options*/
exports.defalta_options = defalta_options;
exports.removeDefault = removeDefault;
