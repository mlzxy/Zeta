var Zeta = require('../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    domain = require('domain'),
    request = require('supertest'),
    m = Zeta.module('test.errHandle', []);


m.config('guard', false);
m.load();
m.handler('h1', function($scope) {
    throw new Error('should be uncaughted');
});

m.guard.get('/', 'h1').with(function($scope) {
    $scope.res.writeHead(500);
    $scope.res.end('500 Internal Error');
});


describe('when m.config(guard) === false, ', function() {

    it('should not handle any error for you', function() {
        var dm = domain.create();
        dm.on('error', function(e) {
            e.message.should.include('uncaughted');
        });
        dm.run(function() {
            var test = request(m.server());
            test.get('/').end();
        });
    });
});