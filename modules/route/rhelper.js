var myUtil = require('../../util/util.js');
var util = require('util');
var methods = ["get", "post", "put", "head", "delete", "options", "trace", "connect", "any"];
var lrt = require('./light-route/');
var EventEmitter = require('events').EventEmitter;
/* this.config.options
 * this.save.handler,provider,router,factory
 * return function in  http.createServer("the function to be returned here").listen(port)
 */


//function $state () { this.emit('name',arglist);} // the arglist would be the next handler arglist, you only need one state, but how you could $state.go('name') without any reference to the $scope?
//util.inherits($scope,EventEmitter);
//st = new $state
//st.on('name',function);
//
// You Must create a $scope at each request, you Must only have one $state
// Then the question is how to past the $scope to the $state, $state.go is pretty...
// what if we create a scope each time? $state.go('name',$scope)// I could define this function each time!
/*================================================*/
// in the router, $scope.go('name')
var handler, router, factory, provider;
var service = {},
    f2arg = {}; //

var server = function() {
    handler = this.save.handler;
    router = this.save.router;
    factory = this.save.factory;
    provider = this.save.provider;
    /*==============================*/
    myUtil.safeCopy(service, factory);
    myUtil.safeCopy(service, provider, "between factory and provider");



    var mkarg = function($scope, next) { //the next here maybe string or function


    };

    var go = function(name) {
        var next;
        if (name == "next") {
            next = this.dchain[0];
        }
        var t = mkarg(this, next);
        t.f(t.arg);
    };

    for (var method in router) {
        var store = router[method];
        for (var pth in store) {
            lrt[method](pth,
                function(req, res) {
                    var $scope = {};
                    $scope.req = req;
                    $scope.res = res;
                    $scope.params = req.params;
                    $scope.go = go;
                    $scope.dchain = store[pth].slice(1);
                    $scope.go(store[pth][0]);
                });
        }
    }


    //////////////////////////
    return lrt;
};









exports.fly = server;
exports.methods = methods;