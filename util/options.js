var defalta_options = {};


var cp = require('./compare.js');

var removeDefault = function(opt) {
    for (var v in opt) {
        if (cp.equals(opt[v], defalta[v]))
            opt[v] = undefined;
        else
            continue;
    }
    return opt;
};


/*for default options*/
exports.defalta = defalta_options;
exports.removeDefault = removeDefault;