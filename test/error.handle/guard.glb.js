var Zeta = require('../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    domain = require('domain'),
    request = require('supertest'),
    emt = require('events').EventEmitter,
    m = Zeta.module('test.errHandle', []);

m.config('guard', true).config('globalDomain', true);
m.load();

var fe = function($scope) {
    $scope.res.writeHead(500);
    $scope.res.end('500 Internal Error');
};

var esrc = new emt();
esrc.on('error', function() {
    throw new Error();
});

m.guard(esrc)
    .get('/err', function($scope) {
        esrc.emit('error');
    })
    .with(fe);



describe('module', function() {
    describe('.guard(component)', function() {
        it('should catch the error in component in global domain', function(done) {
            request(m.server())
                .get('/err')
                .expect(500)
                .end(done);
        });
    });
});