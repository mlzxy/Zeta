/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var url = require('url'),
    myUtil = require('../../util/util.js'),
    print = require('../../util/print.js'),
    util = require('util'),
    net = require('net'),
    http = require('http'),
    lrt = require('./router');


var methods = ["get", "post", "put", "head", "delete", "options", "trace", "connect"],
    needScope = 2,
    notNeedScope = 1;



var server = function() {

    print.mainOk(this);
    print.loading('start to prepare your server.');
    print.options(this.c.options);

    /*===================for shortname=========================*/
    var handler, router, factory, provider;
    handler = this.save.handler;
    router = this.save.router;
    factory = this.save.factory;
    provider = this.save.provider;
    /*=========================================================*/
    var getF = {}, // name: function, function:function    // only for the handler functions in handler and router
        f2argH = {}, // name: [arglist], function: arglist // the arglist for the handler
        f2argF = {}; // function: [arglist];               // arglist for the factory

    //for getF
    for (var name in handler) {
        getF[name] = handler[name];
    }

    for (var method in router) {
        if (method != "any") {
            var store = router[method];
            for (var path in store) {
                var ch = store[path];
                for (var i = 0; i < ch.length; i++) {
                    if (myUtil.isFunction(ch[i])) {
                        getF[ch[i]] = ch[i];
                    } else {
                        myUtil.checkErr(getF[ch[i]] === undefined,
                            'The handler ' + ch[i] + ' have not been registered :[');
                    }
                }
            }
        } else {
            if (router.any !== undefined) {
                if (myUtil.isFunction(router.any)) {
                    getF[router.any] = router.any;
                } else {
                    myUtil.checkErr(getF[router.any] === undefined,
                        'The handler ' + router.any + ' have not been registered :[');
                }
            }
        }
    }


    //f2argH & f2argF
    var getArg = function(v, arr, msg) {
        var args = [];
        var pvd, fat, arg;
        for (var j = 0; j < arr.length; j++) { //args could only be from provider & factory
            myUtil.checkErr(arr[j] == '$scope', msg + ': ' + v + ' use $scope not as its first argument');
            pvd = provider[arr[j]];
            fat = factory[arr[j]];
            myUtil.checkErr(pvd !== undefined && fat !== undefined, 'Same Name conflicts founded between provider and factory: ' + a[j]);
            myUtil.checkErr(pvd === undefined && fat === undefined, 'No provider or factory: ' + a[j] + ' found. Maybe you use a wrong name');
            if (pvd !== undefined) {
                arg = pvd;
            } else {
                arg = fat;
                arg.isFactory = (myUtil.argOf(fat)[0] == '$scope') ? needScope : notNeedScope;
            }
            args.push(arg);
        }
        return args;
    };

    for (var v in getF) {
        var hdl = getF[v];
        var a = myUtil.argOf(hdl);
        var firstArg = a.shift();
        // debugger;
        myUtil.checkErr(firstArg != '$scope', 'Found handler: ' + v + ' that do not take $scope as its first argument');
        f2argH[v] = getArg(v, a, 'Handler');
    }

    for (var u in factory) {
        var fa = factory[u];
        var ar = myUtil.argOf(fa);
        if (ar[0] == '$scope')
            ar.shift();
        f2argF[fa] = getArg(u, ar, 'Factory');
    }



    /*=============================functions below would be called in the real request============================*/
    var mkFactoryNoCache = function($scope, fatr) { //fatr is a function, which needed to be inject arguments.
        var a = f2argF[fatr];
        var args = fatr.isFactory == needScope ? [$scope] : [];
        for (var i = 0; i < a.length; i++) {
            args.push(a[i].isFactory ? mkFactory($scope, a[i]) : a[i]);
        }
        return fatr.apply(this, args);
    };

    var mkFactoryCache = function($scope, fatr) {
        return $scope.dchain[fatr] || ($scope.dchain[fatr] = mkFactoryNoCache($scope, fatr));
    };

    var mkFactory = this.config('serviceCache') ? mkFactoryCache : mkFactoryNoCache;

    var mkarg = function($scope, next) { //the next here maybe string or function
        var f = getF[next];
        var a = f2argH[next];
        var args = [$scope];
        for (var i = 0; i < a.length; i++)
            args.push(a[i].isFactory ? mkFactory($scope, a[i]) : a[i]);
        return {
            f: f,
            arg: args
        };
    };
    /*===============================================*/
    var go = this.config('debug') ?
        function(next) {
            next = (next == "next") ? this.dchain[this.dcIdx++] : next;
            print.goNext(next);
            var t = mkarg(this, next);
            t.f.apply(this, t.arg);
        } : function(next) {
            next = (next == "next") ? this.dchain[this.dcIdx++] : next;
            var t = mkarg(this, next);
            t.f.apply(this, t.arg);
        };
    /*===============================================*/

    for (var mth in router) { //router
        // debugger;
        if (mth != "any") {
            var st = router[mth]; //post, get -> different hashmap of handler chain
            for (var pth in st) { //path1,path2 -> hander chain
                var foo = function(fstate, dchain, req, res) {
                    var $scope = {
                        req: req,
                        res: res,
                        params: req.params,
                        go: go,
                        dchain: dchain, //cache the factory in here
                        dcIdx: 0
                    };
                    $scope.go(fstate);
                };
                foo = foo.bind(undefined, st[pth][0], st[pth]);
                lrt[mth](pth, foo);
            }
        } else {
            if (router.any !== undefined) {
                var bar = function(fstate, dchain, req, res) {
                    // debugger;
                    var $scope = {
                        req: req,
                        res: res,
                        params: req.params,
                        go: go,
                        dchain: dchain, //cache the factory in here
                        dcIdx: 0
                    };
                    $scope.go(fstate);
                };
                bar = bar.bind(undefined, router.any[0], router.any);
                lrt.any(bar);
            }
        }
    }

    /*==========================================================*/
    if (this.config('debug')) {
        net.Server.prototype.on('request', function(req, res) {
            res.start = new Date();
            res.info = {
                ip: req.connection.remoteAddress,
                path: url.parse(req.url).pathname,
                method: req.method
            };
            print.request(res.info);
            /*====================================*/
            res.on('finish', function() {
                print.requestend(this.info, new Date() - this.start);
            });
        });
    }

    print.ok("your server is ready.");

    return lrt;
};

exports.server = server;
exports.methods = methods;