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

m.factory('eFatrA', function() {
    throw new Error();
})

.factory('eFatrB', function() {
    return function() {
        throw new Error();
    };
})

.provider('epvd', function() {
    throw new Error();
})


.handler('h', function($scope) {
    throw new Error();
})

.handler('fa', function($scope, eFatrA) {})

.handler('fb', function($scope, eFatrB) {
    eFatrB();
})

.handler('p', function($scope, epvd) {
    epvd();
})


.guard
    .get('/eh', 'h')
    .get('/efa', 'fa')
    .get('/efb', 'fb')
    .get('/ep', 'p').with(fe);



describe('Sync Error throw from', function() {
    describe('factory function ', function() {
        it('should get caught', function(done) {
            request(m.server())
                .get('/efa')
                .expect(500)
                .end(done);
        });
    });

    describe('object that factory return', function() {
        it('should get caught', function(done) {
            request(m.server())
                .get('/efb')
                .expect(500)
                .end(done);
        });
    });


    describe('provider', function() {
        it('should get caught', function(done) {
            request(m.server())
                .get('/ep')
                .expect(500)
                .end(done);
        });
    });

    describe('handler', function() {
        it('should get caught', function(done) {
            request(m.server())
                .get('/eh')
                .expect(500)
                .end(done);
        });
    });

});