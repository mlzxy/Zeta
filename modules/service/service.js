/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var myUtil = require('../../util/util.js');
var m = require('../../base/base.js').module('built-in-service-base', [], 'builtin');


m.save.handler = {};
m.save.factory = {};
m.save.provider = {};




var handler = function(hname, f) {
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    else if (myUtil.isArray(f))
        f = f;
    else
        myUtil.error("Handler " + hname + " is not a function.");

    myUtil.safePut(this.save.factory, hname, f, "Handler ");
};

var factory = function(fname, f) {
    if (myUtil.isFunction(f))
        myUtil.safePut(this.save.factory, fname, f, "Factory ");
    else
        myUtil.error("Factory " + fname + " is not a function, it should be a factory function :)");
};

var provider = function(pname, of) {
    myUtil.safePut(this.save.provider, pname, of, "Provider ");
};

m.handler = handler;
m.provider = provider;
m.factory = factory;


module.exports = exports = m;