/*=========================================*/
var defalta = {};



var LOAD_MARK = "GLIDING_LOAD_MARK";
var LOADED = 'yes';
var NOT_LOADED = 'no';


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


/*for default options*/
exports.defalta = defalta;
exports.removeDefault = removeDefault;

/*for load mark*/
exports.LOAD_MARK = LOAD_MARK;
exports.LOADED = LOADED;
exports.NOT_LOADED = NOT_LOADED;