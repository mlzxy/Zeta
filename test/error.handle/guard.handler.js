var Zeta = require('../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    domain = require('domain'),
    request = require('supertest'),
    m = Zeta.module('test.errHandle', [])

.config('guard', true)
.load()




.handler('h1', function($scope) {
    throw new Error();
})


.handler('eh', function($scope) {
    $scope.res.writeHead(500);
    $scope.res.end('500 Internal Error');
});

m.guard.get('/', 'h1').with('eh');


describe('m.guard.get().with(\'name\'), ', function() {
    it('should use handler[name] to handle error', function(done) {
        request(m.server())
            .get('/')
            .expect(500)
            .end(function(err,res){
                res.text.should.include('Internal');
                done();
            });
    });
});
