var myUtil = require('../util/util.js');

// m.handler = mhelper.handler;
// m.provider = mhelper.provider;
// m.factory = mhelper.factory;



/*modify m.save.options*/
var config = function(nameObj, val) {
    if (arguments.length == 1) {
        return this.save.options[nameObj];
    } else {
        this.save.options[nameObj] = val;
    }
    return undefined;
};


/*just save*/
var handler = function(hname, f) {
    myUtil.safePut(this.save.factory, hname, f, "provider ");
};

var factory = function(fname, of) {
    myUtil.safePut(this.save.factory, fname, of, "provider ");
};

var provider = function(pname, of) {
    myUtil.safePut(this.save.provider, pname, of, "provider ");
};




exports.config = config;
exports.handler = handler;
exports.factory = factory;
exports.provider = provider;