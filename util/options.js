/*!
 * gliding
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var defalta = {};







defalta.circleCheck = true;
defalta.root = process.cwd();
defalta.public = "public";
defalta.debug = true;


var equals = require('deep-equal');

var removeDefault = function(opt) {
    var nopt = {};
    for (var v in opt) {
        if (equals(opt[v], defalta[v]))
            continue;
        else
            nopt[v] = opt[v];
    }
    return nopt;
};


/*for default options*/
exports.defalta = defalta;
exports.removeDefault = removeDefault;
exports.circleCheck = 'circleCheck';