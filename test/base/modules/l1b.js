var Zeta = require('../../../'),
    conf = require('../conf.js'),
    m = Zeta.module('l1b', ['l2c', 'l2d']);


m.load();

conf.v = m.config('v');
conf.ns.v1 = m.config.of('ns').val('v1');
conf.ns.v2 = m.config.of('ns').val('v2');
conf.ns.ns.v1 = m.config.of('ns').of('ns').val('v1');
conf.ns.ns.v2 = m.config.of('ns').of('ns').val('v2');


//this changes would not take effects
m.config('v', 2);
m.config.of('ns').val('v1', 2).val('v2', 4);
m.config.of('ns').of('ns').val('v1', 2).val('v2', 4);


m.l1b = true;


m.factory('l1b.f', function() {
    return 1;
})

.provider('l1b.p', function() {})

.handler('l1b.h', function($scope) {
    $scope.res.end(404);
})

.get('/l1b', 'l1b.h')

.setInit(function() {
    this.il1b = true;
});