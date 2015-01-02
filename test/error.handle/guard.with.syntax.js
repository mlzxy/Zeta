var Zeta = require('../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    domain = require('domain'),
    request = require('supertest'),
    m = Zeta.module('test.errHandle', []);


m.config('guard', true);
m.load();

var fe = function($scope) {
    $scope.res.writeHead(500);
    $scope.res.end('500 Internal Error');
};



m.handler('h1', function($scope) {
    throw new Error('should be uncaughted');
});


m.post('/', 'h1');
m.get('/', 'h1');
m.get('/2', 'h1');
m.guard.get().post('/').post('/form', 'h1').any('h1').with(fe);

/*====other methods====*/


describe('guard', function() {
    describe('.get()', function() {
        it('should protect all get paths', function(done) {
            request(m.server())
                .get('/')
                .expect(500)
                .end(function() {
                    request(m.server())
                        .get('/2')
                        .expect(500)
                        .end(done);
                });
        });
    });
    describe('.post(path)', function() {
        it('shoudl pretect the specific path', function(done) {
            request(m.server())
                .post('/')
                .expect(500)
                .end(done);
        });
    });
    describe('.post(path,hchain).with(errorHandler)', function() {
        it('should set the routing path, and protect it', function(done) {
            request(m.server())
                .post('/form')
                .expect(500)
                .end(done);
        });
    });

    describe('.any(f)', function() {
        it('should set router:any and protect them', function(done) {
            request(m.server())
                .post('/any')
                .expect(500)
                .end(function(err, res) {
                    res.text.should.include('Internal');
                    done();
                });
        });
    });

    describe('peusdo test for all req methods', function() {
        it('should work because they are treated totally the same internally', function() {
            m.guard
                .get().get('/').get('/', 'h1')
                .head().head('/').head('/', 'h1')
                .options().options('/').options('/', 'h1')
                .delete().delete('/').delete('/', 'h1')
                .put().put('/').put('/', 'h1')
                .trace().trace('/').trace('/', 'h1')
                .connect().connect('/').connect('/', 'h1').with(fe);
        });
    });
});