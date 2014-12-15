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


var m = require('../../base/base.js').module('built-in-router', ['built-in-service-more']);
m.config('builtin', true); //for testing option spread
m.load();


m.save.router = {};

for (var k = 0; k < methods.length; k++) {
    m.save.router[methods[k]] = {};
}

/*========================================================================*/
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
        myUtil.safePut(m.save.router[method], path, //here we could use m instead of this, because the this.save.router.method are all the same across modules,
            f, "handler for " + method); // see more in mhelper.js mergeMoudule: how moudles merged
    };
    m[methods[i]] = m[methods[i]].bind(undefined, methods[i]);
}

/*========================================================================*/

m.any = function(f) {
    var errMsg1a = "You should register a router with a handler or a chain of handlers for path: ";
    var errMsg1b = e(" method: ") + eacolor("any");
    var errMsg2a = "In the handler chain you register for path:";
    var errMsg2b = e(" method:") + eacolor("any") + e(" there is non-function & non-string element:");
    myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f) || myUtil.isString(f)),
        errMsg1a + eacolor(path) + errMsg1b);
    if (myUtil.isFunction(f) || myUtil.isString(f))
        f = [f];
    for (var ki = 0; ki < f.length; ki++)
        myUtil.checkErr(!(myUtil.isFunction(f[ki]) || myUtil.isString(f[ki])),
            errMsg2a + eacolor(path) + errMsg2b + eacolor(JSON.stringify(f[ki])));
    this.save.router.any = f;
};




var listen_org = net.Server.prototype.listen;
var listen_new = function() {
    this._listen.apply(this, arguments);
    print.listen(this.address());
    this.on('close', function() {
        print.close('the server has been closed.');
    });
};
net.Server.prototype._listen = listen_org;
net.Server.prototype.listen = listen_new;






m.s = m.server = rhlp.server;