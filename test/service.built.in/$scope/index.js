var Zeta = require('../../../'),
    request = require('supertest'),
    chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    demo = Zeta.module('demo', []);

var __proto__res = require('http').ServerResponse.prototype;

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


describe('module.scope', function() {
    describe('.set(test,hello world)', function() {
        it('should set http.ServerResponse.prototype.test = hello world', function() {
            demo.scope.set('test', 'hello world');
            __proto__res.test.should.be.equal('hello world');
        });
    });
    describe('.get(test)', function() {
        it('should get http.ServerResponse.prototype.test', function() {
            demo.scope.set('test', 'hello world');
            __proto__res.test.should.be.equal(demo.scope.get('test'));
        });
    });
    describe('.rm(test)', function() {
        it('should rm the http.ServerResponse.prototype.test', function() {
            demo.scope.set('test', 'hello world').rm('test');
            assert.isUndefined(__proto__res.test);

        });
    });
    describe('.resv(test1,test2)', function() {
        it('should set the http.ServerResponse.prototype.test1,2 to be undefined', function() {
            demo.scope.set('test1', 'hello world').set('test2', 'hello world').resv('test1', 'test2');
            assert.isUndefined(__proto__res.test1);
            assert.isUndefined(__proto__res.test2);
        });
    });
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