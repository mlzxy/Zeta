/*!
 * gliding
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('mime');
var rhlp = require('./rhelper.js');
var myUtil = require('../../util/util.js');
var clc = require('cli-color');
var methods = rhlp.methods;


var m = require('../../base/base.js').module('built-in-router', ['built-in-service-more']);
m.config('builtin', true); //for testing option spread



m.save.router = {};
for (var k in methods) {
    m.save.router[methods[k]] = {};
}

var eacolor = clc.yellowBright;
var e = clc.magenta;

for (var i = 0; i < methods.length; i++) {
    m.save.router[methods[i]] = {};
    m[methods[i]] = function(method, path, f) {
        var errMsg1a = "You should register a router with a handler or a chain of handlers for path: ";
        var errMsg1b = e(" method: ") + eacolor(method);
        var errMsg2a = "In the handler chain you register for path:";
        var errMsg2b = e(" method:") + eacolor(method) + e(" there is non-function & non-string element:");
        /*========================*/
        myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
            errMsg1a + eacolor(path) + errMsg1b);
        if (myUtil.isFunction(f) || myUtil.isString(f))
            f = [f];
        for (var ki = 0; ki < f.length; ki++)
            myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
                errMsg2a + eacolor(path) + errMsg2b + eacolor(JSON.stringify(f[ki])));
        myUtil.safePut(m.save.router[method], path,
            f, "handler for " + method);
    };
    m[methods[i]] = m[methods[i]].bind(undefined, methods[i]);
}

m.go = rhlp.go;