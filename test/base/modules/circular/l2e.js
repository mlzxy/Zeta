var Zeta = require('../../../../'),
    conf = require('../../conf.js'),
    m = Zeta.module('l2e', ['l2e']);


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


m.l2e = true;


m.factory('l2e.f', function() {
    return 1;
})

.provider('l2e.p', function() {})

.handler('l2e.h', function($scope) {
    $scope.res.end(404);
})

.get('/l2e', 'l2e.h')


.setInit(function() {
    this.il2e = true;
});