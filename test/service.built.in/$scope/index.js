var Zeta = require('../../../'),
    request = require('supertest'),
    chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    demo = Zeta.module('demo', []);

demo.load();

demo.get('/string', function($scope) {
    $scope.send('hello world').end();
});

demo.get('/json', function($scope) {
    $scope.send({
        hello: 'world'
    }).end();
});

demo.get('/setHeader', function($scope) {
    $scope.send('hello world', {
        "Content-Type": "text/html",
        "Set-Cookie": ["user=xyzhang"]
    }).end();
});

demo.get('/end', function($scope) {
    $scope.end('hello world');
});



describe('$scope', function() {
    describe('.send(string)', function() {
        it('should send the string to client', function(done) {
            request(demo.server())
                .get('/string')
                .end(function(err, res) {
                    res.text.should.include('hello world');
                    done();
                });
        });
    });

    describe('.send(obj)', function() {
        it('should send the JSON.stringify(obj), and set Content-Type', function(done) {
            request(demo.server())
                .get('/json')
                .expect('content-type', 'application/json')
                .end(function(err, res) {
                    res.body.hello.should.include('world');
                    done();
                });
        });
    });

    describe('.send(**, header)', function() {
        it('should send stuff, and set http-header accroding to the header', function(done) {
            request(demo.server())
                .get('/setHeader')
                .expect("content-type", "text/html")
                .expect('set-cookie', 'user=xyzhang')
                .end(function(err, res) {
                    res.text.should.include('hello world');
                    done();
                });
        });
    });

    describe('.end(**)', function() {
        it('should end this response with the string or buffer provided', function(done) {
            request(demo.server())
                .get('/end')
                .end(function(err, res) {
                    res.text.should.include('hello world');
                    done();
                });
        });
    });
});