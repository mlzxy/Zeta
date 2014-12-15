/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var myUtil = require('../../util/util.js');
var m = require('../../base/base.js').module('built-in-service-base', []);
m = m.load();

m.save = {};
m.save.handler = {};
m.save.factory = {};
m.save.provider = {};




var handler = function(hname, f) {
    if (f === undefined)
        return this.save.handler[hname];
    myUtil.checkErr(!myUtil.isFunction(f), "Handler " + hname + " is not a function :(");
    myUtil.safePut(this.save.handler, hname, f, "Handler ");
    return this;
};

var factory = function(fname, f) {
    if (f === undefined)
        return this.save.factory[fname];
    myUtil.checkErr(!myUtil.isFunction(f), "Factory " + fname + " is not a function, it should be a factory function :)");
    myUtil.safePut(this.save.factory, fname, f, "Factory ");
    return this;
};

var provider = function(pname, f) {
    if (f === undefined)
        return this.save.provider[pname];
    myUtil.safePut(this.save.provider, pname, f, "Provider ");
    return this;
};

m.h = m.handler = handler;
m.p = m.provider = provider;
m.f = m.factory = factory;