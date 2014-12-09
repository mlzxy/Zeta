/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('mime');
var rhlp = require('./rhelper.js');
var myUtil = require('../../util/util.js');
var methods = rhlp.methods;

var m = require('../../base/base.js').module('built-in-router', [__dirname + "/../service/more_service.js"]);



m.save.router = {};
for (var k in methods) {
    m.save.router[methods[k]] = {};
}
for (var i = 0; i < methods.length; i++) {
    m[methods[i]] = function(path, f) {
        myUtil.checkErr(!(myUtil.isFunction(f) || myUtil.isArray(f)),
            "You should register a router with a function or a handler chain for path:" + path + " method:" + methods[i]);
        var chain;
        if (myUtil.isFunction(f))
            chain = [f];
        for (var ki = 0; ki < chain.length; ki++)
            myUtil.checkErr(!(myUtil.isFunction(chain[ki]) || myUtil.isString(chain[ki])),
                "In the handler chain you register for path:" + path + " method:" + methods[i] + " there is non-function & non-string element:" + JSON.stringify(chain[ki]));
        myUtil.safePut(m.save.router[methods[i]], path,
            chain, "handler for " + methods[i]);
    };
}





m.go = rhlp.go;




/*============must have for builtin modules==============*/
module.exports = exports = m;