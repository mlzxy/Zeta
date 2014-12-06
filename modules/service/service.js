var myUtil = require('../../util/util.js');
var m = require('../../base/base.js').module('built-in-service-base', []);



m.save.handler = {};
m.save.factory = {};
m.save.provider = {};




var handler = function(hname, f) {
    myUtil.safePut(this.save.factory, hname, f, "provider ");
};

var factory = function(fname, of) {
    myUtil.safePut(this.save.factory, fname, of, "provider ");
};

var provider = function(pname, of) {
    myUtil.safePut(this.save.provider, pname, of, "provider ");
};

m.handler = handler;
m.provider = provider;
m.factory = factory;