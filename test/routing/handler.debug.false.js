var Zeta = require('../../'),
    assert = require('assert'),
    request = require('supertest'),
    demo = Zeta.module('demo', []),
    should = require('chai').should();
demo.c('debug', false).load();
describe('define handler', function(done) {
    it('should get handler itself', function() {
        demo.handler('h0', function($scope) {
            return 'wow';
        });
        var tmp = demo.handler('h0');
        tmp().should.equal('wow');
    });
    it('should define handler successfully', function() {
        demo.handler('h1', function($scope) {
            $scope.res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            $scope.res.write('hello,world');
            $scope.res.end();
        });
        demo.get('/test', 'h1');
        request(demo.server())
            .get('/test')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                res.text.should.equal('hello,world');
            });
    });
    it('can use hander as h in short', function(done) {
        demo.handler('h2', function($scope) {
            $scope.res.writeHead(200, {
                'addon': 'hello'
            });
            $scope.res.end();
        });
        demo.get('/query', 'h2');
        request(demo.server(true)).
        get('/query').
        expect(200).
        expect('addon', 'hello', done);
    });
    it('should has $scope as its first arg', function(done) {
        demo.handler('h0', function($wel, $scope) {
            $scope.res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            $scope.res.write('wow');
            $scope.res.end();
        });
        demo.get('/', 'h0');
        try {
            request(demo.server(true)).
            get('/').
            expect('wow', done);
        } catch (err) {
            console.log(err);
            err.message.should.equal('Found handler: h0 that do not take $scope as its first argument');
            done();
        }
    });
    it('should use provider and factory successfully', function(done) {
        demo.provider('$num', {
            value: 0
        });
        demo.factory('$plus', function() {
            return function(val) {
                return ++val;
            };
        });
        demo.handler('h0', function($scope, $num, $plus) {
            var cou = $plus($num.value);
            $scope.res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            $scope.res.write(cou.toString());
            $scope.res.end();
        });
        demo.get('/', 'h0');
        request(demo.server(true)).
        get('/').
        expect('1', done);
    });
    it('should cover the previous one', function(done) {
        demo.handler('h1', function($scope) {
            $scope.res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            $scope.res.write('hi,world');
            $scope.res.end();
        });
        request(demo.server(true)).
        get('/test').
        expect(200).
        end(function(err, res) {
            if (err) done(err);
            res.text.should.equal('hi,world');
            done();
        });
    });
});