var Zeta = require('../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    domain = require('domain'),
    request = require('supertest'),
    m = Zeta.module('test.errHandle', []);

m.config('guard', true).config('globalDomain', true);
m.load();

var fe = function($scope) {
    $scope.res.writeHead(500);
    $scope.res.end('500 Internal Error');
};


m.handler('eres', function($scope) {
    $scope.res.end({}); //not a string or buffer
})

.handler('ereq', function($scope) {
    $scope.req.on('error', function() {
        throw new Error();
    });
    $scope.req.emit('error');
})


.guard
    .get('/eres', 'eres')
    .get('/ereq', 'ereq').with(fe);



describe('Async Error throw from response & request', function() {
    it('should catch error in request', function(done) {
        request(m.server())
            .get('/ereq')
            .expect(500)
            .end(done);
    });

    it('should catch error in response', function(done) {
        request(m.server())
            .get('/eres')
            .expect(500)
            .end(done);
    });
});