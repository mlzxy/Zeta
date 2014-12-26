var Zeta = require('../../../../../'),
    conf = require('../../conf.js'),
    m = Zeta.module('l1c', ['l2e', 'l2f', 'l2g']);


m.config('v', 2);
m.config.of('ns').val('v1', 2).val('v2', 4);
m.config.of('ns').of('ns').val('v1', 2).val('v2', 4);
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


m.l1c = true;


m.factory('l1c.f', function() {
    return 1;
})

.provider('l1c.p', function() {})

.handler('l1c.h', function($scope) {
    $scope.res.end(404);
})

.get('/l1c', 'l1c.h');
