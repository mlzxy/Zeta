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
    lrt = require('./router'),
    domain = require('domain');
myUtil.invalidate(__dirname + '/router/');


var methods = require('../../util/config.js').methods,
    needScope = 2,
    notNeedScope = 1;



var server = function() {
    if (this.save.server && !arguments[0]) {
        print.cacheServer();
        return this.save.server;
    }
    print.mainOk(this);
    print.loading('start to prepare your server.');
    print.options(this.c.options);


    /*===================for shortname================================================================*/
    var handler, router, factory, provider, gdomain, routerE, handlerE;
    handler = this.save.handler;
    router = this.save.router;
    factory = this.save.factory;
    provider = this.save.provider;
    gdomain = this.save.domain.global; //not recommend to use !!
    routerE = this.save.domain.router;
    handlerE = this.save.domain.handler;
    /*================================BEGIN=========================================================================*/
    var getF = {}, // name: function, function:function    // only for the handler functions in handler and router
        f2argH = {}, // name: [arglist], function: arglist // the arglist for the handler
        f2argF = {}; // function: [arglist];               // arglist for the factory

    //for getF
    for (var name in handler) {
        getF[name] = handler[name];
    }

    for (var method in router) {
        var store = router[method];
        for (var path in store) {
            var ch = store[path];
            for (var i = 0; i < ch.length; i++) {
                if (myUtil.isFunction(ch[i])) {
                    getF[ch[i]] = ch[i];
                } else {
                    myUtil.checkErr(getF[ch[i]] === undefined,
                        'The handler ' + ch[i].toString() + ' have not been registered :[');
                }
            }
        }
    }

    for (var i2 = 0; i2 < handlerE.length; i2++)
        getF[handlerE[i2]] = handlerE[i2];


    //f2argH & f2argF
    var getArg = function(v, arr, msg) {
        var args = [];
        var pvd, fat, arg;
        for (var j = 0; j < arr.length; j++) { //args could only be from provider & factory
            myUtil.checkErr(arr[j] == '$scope', msg + ': ' + v + ' use $scope not as its first argument');
            pvd = provider[arr[j]];
            fat = factory[arr[j]];
            myUtil.checkErr(pvd !== undefined && fat !== undefined, 'Same Name conflicts founded between provider and factory: ' + a[j].toString());
            myUtil.checkErr(pvd === undefined && fat === undefined, 'No provider or factory: ' + a[j].toString() + ' found. Maybe you use a wrong name');
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
    if (!this.config('guard')) {
        for (var mth in router) { //router
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
                pth == 'any' ? lrt.any(foo) : lrt[mth](pth, foo);
            }
        }

    } else { //
        //if use guard for error handling, need collect more info and use different routing fun

        var err_handler_default = function($scope) {
            print.httpErr($scope.res.info);
            $scope.res.end('500 Server Internal Error');
        };
        var err_handler_wrapper = function(eh, err) {
            err.$scope.error = err;
            var t = mkarg(err.$scope, eh);
            t.f.apply(this, t.arg);
        };
        /*===================================================================================*/
        if (this.config('globalDomain')) {
            for (var m in router) { //router
                var s = router[m]; //post, get -> different hashmap of handler chain
                for (var p in s) { //path1,path2 -> hander chain
                    var eh = handlerE[routerE[m][p] || routerE.any.any] || err_handler_default,
                        f = function(fstate, dchain, onErrorfun, req, res) {
                            var d = domain.create();
                            d.add(req);
                            d.add(res);
                            d.add(gdomain);
                            var $scope = {
                                req: req,
                                res: res,
                                params: req.params,
                                go: go,
                                dchain: dchain, //cache the factory in here
                                dcIdx: 0
                            };
                            d.$scope = $scope;
                            d.on('error', onErrorfun);
                            d.run(function() {
                                gdomain.run(function() {
                                    $scope.go(fstate);
                                });
                            });
                        };
                    f = f.bind(undefined, s[p][0], s[p], err_handler_wrapper.bind(undefined, eh));
                    p == 'any' ? lrt.any(f) : lrt[m](p, f);
                }
            }
        } else {
            for (var m in router) { //router
                var s = router[m]; //post, get -> different hashmap of handler chain
                for (var p in s) { //path1,path2 -> hander chain
                    var eh = handlerE[routerE[m][p] || routerE.any.any] || err_handler_default,
                        f = function(fstate, dchain, onErrorfun, req, res) {
                            var d = domain.create();
                            d.add(req);
                            d.add(res);
                            var $scope = {
                                req: req,
                                res: res,
                                params: req.params,
                                go: go,
                                dchain: dchain, //cache the factory in here
                                dcIdx: 0
                            };
                            d.$scope = $scope;
                            d.on('error', onErrorfun);
                            d.run(function() {
                                $scope.go(fstate);
                            });
                        };

                    f = f.bind(undefined, s[p][0], s[p], err_handler_wrapper.bind(undefined, eh));
                    p == 'any' ? lrt.any(f) : lrt[m](p, f);
                }
            }

        }

    }


    /*============================END======================================================================*/
    var server = http.createServer();
    print.ok("your server is ready.");


    if (this.config('debug')) {
        server.on('request', function(req, res) {
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

    server.on('request', lrt);
    server.on('listening', function() {
        print.listen(this.address());
    });
    server.on('close', function() {
        print.close('the server has been closed.');
    });


    this.save.server = server;
    return server;
};

exports.server = server;