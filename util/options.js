/*=========================================*/
var defalta = {};
defalta.handlerOpt = ["get", "post", "put", "head", "delete", "options", "trace", "connect", "any"];
defalta.ROOT = ".";

var ROOT = ".";


/*=========================================*/
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



exports.dafalta = defalta;
exports.removeDefault = removeDefault;
exports.ROOT = ROOT;
