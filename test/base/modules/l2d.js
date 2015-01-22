var Zeta = require('../../../'),
    conf = require('../conf.js'),
    m = Zeta.module('l2d', []);

if (m.config('v') !== 1)
    throw new Error('m.config(v) = ' + m.config('v'));

var tmp = m.config('v');
m.config('v', 3);

m.load();

if (m.config('v') !== 3)
    throw new Error();

m.config('v', tmp);
conf.v = m.config('v');
conf.ns.v1 = m.config.of('ns').val('v1');
conf.ns.v2 = m.config.of('ns').val('v2');
conf.ns.ns.v1 = m.config.of('ns').of('ns').val('v1');
conf.ns.ns.v2 = m.config.of('ns').of('ns').val('v2');


//this changes would not take effects
m.config('v', 2);
m.config.of('ns').val('v1', 2).val('v2', 4);
m.config.of('ns').of('ns').val('v1', 2).val('v2', 4);


m.l2d = true;


m.factory('l2d.f', function() {
    return 1;
})

.provider('l2d.p', function() {})

.handler('l2d.h', function($scope) {
    $scope.res.end(404);
})

.get('/l2d', 'l2d.h')


.setInit(function() {
    this.il2d = true;
});