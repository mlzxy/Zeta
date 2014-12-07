var myUtil = require('../../util/util.js');
var m = require('../../base/base.js').module('built-in-service-base', []);



m.save.handler = {};
m.save.factory = {};
m.save.provider = {};




var handler = function(hname, f) {
    if (myUtil.isFunction(f))
        myUtil.safePut(this.save.factory, hname, f, "provider ");
    else
        myUtil.error("Handler " + hname + " is not a function.");
};

var factory = function(fname, f) {
    if (myUtil.isFunction(f))
        myUtil.safePut(this.save.factory, fname, f, "factory ");
    else
        myUtil.error("Factory " + fname + " is not a function, it should be a factory function :)");
};

var provider = function(pname, of) {
    myUtil.safePut(this.save.provider, pname, of, "provider ");
};

m.handler = handler;
m.provider = provider;
m.factory = factory;