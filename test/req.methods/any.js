var Zeta=require('../../'),
    should=require('chai').should(),
    request=require('supertest'),
    assert=request('assert');
var demo=Zeta.module('demo',[]);
demo.load();
describe('demo.any',function(){
    it('should handle undefined ',function(done){
        demo.handler('h0',function($scope){
            $scope.res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            $scope.res.write('Not Found');
            $scope.res.end();
        });
        demo.any('h0');
        request(demo.server(true)).
            get('/foo').
            expect(404).
            expect('Not Found',done);
    });
    it('should be able to use a function as argument & cover the previous one',function(done){
        demo.any(function($scope){
            $scope.res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            $scope.res.write('Wrong');
            $scope.res.end();
        });
        request(demo.server(true)).
            get('/foo').
            expect(404).
            expect('Wrong',done);
    });
    it('should not handle the defined path',function(done){
        demo.get('/foo',function($scope){
            $scope.res.writeHead(200,{
                'Content-Type':'text/plain'
            });
            $scope.res.end();
        });
        request(demo.server(true)).
            get('/foo').
            expect(200,done);
    });
    it('should handle other methods of defined path',function(done){
        request(demo.server()).
            post('/foo').
            expect(404).
            expect('Wrong',done);
    });
    it('should support more than one handler',function(done){
        demo.h('h1',function($scope){
            $scope.content='Go';
            $scope.go('next');
        });
        demo.h('h2',function($scope){
            $scope.res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            $scope.res.write($scope.content);
            $scope.res.end();
        });
        demo.any(['h1','h2']);
        request(demo.server(true)).
            get('/query').
            expect(404).
            expect('Go',done);
    });
    it('should not cover the defined handler',function(done){
        request(demo.server()).
            get('/foo').
            expect(200,done);
    });
});
