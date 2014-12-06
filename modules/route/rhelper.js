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
var server = function() {


};









exports.server = server;
exports.methods = methods;