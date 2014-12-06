var m = require('../../base/base.js').module('built-in-router', [__dirname + "/../service/template.js"]);
var rhlp = require('./rhelper.js');
var myUtil = require('../../util/util.js');
var methods = rhlp.methods;



m.save.router = {};
for (var k in methods) {
    m.save.router[methods[k]] = {};
}
for (var i = 0; i < methods.length; i++) {
    m[methods[i]] = function(path, chain) {
        myUtil.safePut(m.save.router[methods[i]], path,
            chain, "handler for " + methods[i]);
    };
}

m.server = rhlp.server;