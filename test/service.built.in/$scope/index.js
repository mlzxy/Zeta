var Zeta = require('../../../'),
    request = require('supertest'),
    chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    demo = Zeta.module('demo', []);
demo.config('public', __dirname + '/public');

demo.load();

demo.get('/string', function($scope) {
    $scope
        .send('hello world')
        .end();
});

demo.get('/json-1', function($scope) {
    $scope
        .send({
            hello: 'world'
        })
        .end();
});

demo.get('/json-2', function($scope) {
    $scope
        .json({
            hello: 'world'
        })
        .end();
});


demo.get('/head', function($scope) {
    $scope
        .head("Content-Type", "text/html")
        .send('hello world')
        .end();
});



demo.get('/status', function($scope) {
    $scope
        .status(302)
        .end('hello world');
});


demo.get('/render', function($scope) {
    $scope.render('/index.html', {
        welcome: ':D'
    });
});

demo.get('/sendFile', function($scope) {
    $scope.sendFile('/index.html');
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
                .get('/json-1')
                .expect('content-type', 'application/json')
                .end(function(err, res) {
                    res.body.hello.should.include('world');
                    done();
                });
        });
    });

    describe('.json(obj)', function() {
        it('should sent the JSON and set Content-type', function(done) {
            request(demo.server())
                .get('/json-2')
                .expect('content-type', 'application/json')
                .end(function(err, res) {
                    res.body.hello.should.include('world');
                    done();
                });
        });
    });

    describe('.head(x,y)', function() {
        it('should set the header x to y', function(done) {
            request(demo.server())
                .get('/head')
                .expect('content-type', "text/html")
                .end(done);
        });
    });

    describe('.status(code)', function() {
        it('should set the response code', function(done) {
            request(demo.server())
                .get('/status')
                .expect(302)
                .end(done);
        });
    });

    describe('.render(file,json)', function() {
        it('should return the rendered file', function(done) {
            request(demo.server())
                .get('/render')
                .end(function(err, res) {
                    res.text.should.include(':D');
                    request(demo.server())
                        .get('/render')
                        .end(function(err, res) {
                            res.text.should.include(':D');
                            done();
                        });
                });
        });
    });


    describe('.sendFile(file)', function() {
        it('should return the orig file', function(done) {
            request(demo.server())
                .get('/sendFile')
                .end(function(err, res) {
                    res.text.should.include('welcome');
                    request(demo.server())
                        .get('/sendFile')
                        .end(function(err, res) {
                            res.text.should.include('welcome');
                            done();
                        });
                });
        });
    });


});