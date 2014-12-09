/*!
 * gliding
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var url = require('url');
var myUtil = require('../../util/util.js');
var print = require('../../util/print.js');
var util = require('util');
var methods = ["get", "post", "put", "head", "delete", "options", "trace", "connect", "any"];
var lrt = require('./light-route/');
var needScope = 2;
var notNeedScope = 1;


var server = function() {

    print.loading('start to prepare your server.');
    if (this.config('debug'))
        print.notice('You have turned on the debug option.');

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
    var mkFactory = function($scope, fatr) { //fatr is a function, which needed to be inject arguments.
        var a = f2argF[fatr];
        var args = fatr.isFactory == needScope ? [$scope] : [];
        for (var i = 0; i < a.length; i++) {
            args.push(a[i].isFactory ? mkFactory($scope, a[i]) : a[i]);
        }
        return fctr(args);
    };

    var mkarg = function($scope, next) { //the next here maybe string or function
        var f = getF[next];
        var a = f2argH[next];
        var args = [];
        for (var i = 0; i < a.length; i++)
            args.push(a[i].isFactory ? mkFactory($scope, a[i]) : a[i]);
        return {
            f: f,
            arg: args.unshift($scope)
        };
    };
    var go = function(name) {
        var next = (next == "next") ? this.dchain[0] : next;
        var t = mkarg(this, next);
        t.f(t.arg);
    };
    var go_debug = function(name) {
        var next = (next == "next") ? this.dchain[0] : next;
        if (myUtil.isString(next))
            print.goNext(next);
        else
            print.goNext('next');
        var t = mkarg(this, next);
        t.f(t.arg);
    };

    for (var mth in router) {
        var st = router[method];
        for (var pth in st) {
            var fordebug = function(req, res) {
                print.request({
                    ip: req.connection.remoteAddress,
                    path: url.parse(req.url).pathname,
                    method: mth
                });
                var $scope = {};
                $scope.req = req;
                $scope.res = res;
                $scope.params = req.params;
                $scope.go = go;
                $scope.dchain = st[pth].slice(1);
                $scope.go_debug(st[pth][0]);
            };
            var forproduct = function(req, res) {
                var $scope = {};
                $scope.req = req;
                $scope.res = res;
                $scope.params = req.params;
                $scope.go = go;
                $scope.dchain = st[pth].slice(1);
                $scope.go(st[pth][0]);
            };
            lrt[mth](pth, this.config("debug") ? fordebug : forproduct);
        }
    }
    //////////////////////////
    print.ok("your server is ready.");
    return lrt;
};









exports.go = server;
exports.methods = methods;