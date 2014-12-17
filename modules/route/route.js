/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var url = require('url'),
    path = require('path'),
    fs = require('fs'),
    mime = require('mime'),
    rhlp = require('./rhelper.js'),
    myUtil = require('../../util/util.js'),
    clc = require('cli-color'),
    print = require('../../util/print.js'),
    http = require('http'),
    net = require('net');


var methods = rhlp.methods;
var errMsg1a = "You should register a router with a handler or a chain of handlers for path: ";
var errMsg2a = "In the handler chain you register for path:";
var m = require('../../base/base.js').module('built-in-router', ['built-in-service-more']);
m.load();

m.save.router = {};
for (var k = 0; k < methods.length; k++) {
    m.save.router[methods[k]] = {};
}


/*=====================tedious job========================*/

m[methods[0]] = function(path, f) {
    var method = methods[0];
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright(method);
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright(method) + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    myUtil.safePut(this.save.router[method], path,
        f, "handler for " + method);
    return this;
};

m[methods[1]] = function(path, f) {
    var method = methods[1];
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright(method);
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright(method) + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    myUtil.safePut(this.save.router[method], path,
        f, "handler for " + method);
    return this;
};

m[methods[2]] = function(path, f) {
    var method = methods[2];
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright(method);
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright(method) + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    myUtil.safePut(this.save.router[method], path,
        f, "handler for " + method);
    return this;
};

m[methods[3]] = function(path, f) {
    var method = methods[3];
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright(method);
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright(method) + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    myUtil.safePut(this.save.router[method], path,
        f, "handler for " + method);
    return this;
};

m[methods[4]] = function(path, f) {
    var method = methods[4];
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright(method);
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright(method) + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    myUtil.safePut(this.save.router[method], path,
        f, "handler for " + method);
    return this;
};

m[methods[5]] = function(path, f) {
    var method = methods[5];
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright(method);
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright(method) + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    myUtil.safePut(this.save.router[method], path,
        f, "handler for " + method);
    return this;
};

m[methods[6]] = function(path, f) {
    var method = methods[6];
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright(method);
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright(method) + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    myUtil.safePut(this.save.router[method], path,
        f, "handler for " + method);
    return this;
};

m[methods[7]] = function(path, f) {
    var method = methods[7];
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright(method);
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright(method) + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    myUtil.safePut(this.save.router[method], path,
        f, "handler for " + method);
    return this;
};



m.any = function(f) {
    var errMsg1b = clc.magenta(" method: ") + clc.yellowBright("any");
    var errMsg2b = clc.magenta(" method:") + clc.yellowBright("any") + clc.magenta(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + clc.yellowBright(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + clc.yellowBright(path) + errMsg2b + clc.yellowBright(JSON.stringify(f[ki])));

    this.save.router.any = f;
    return this;
};


/*===================above are some tedious work========================*/



m.s = m.server = rhlp.server;
m.app = function() {
    var port, server, t;
    if (myUtil.isNumber(arguments[0])) {
        port = arguments[0];
        t = 1;
    } else {
        port = 8000;
        t = 0;
    }
    if (!arguments[t])
        server = this.save.server || this.server();
    else
        server = this.server(true);

    server.listen(port);
    return server;
};