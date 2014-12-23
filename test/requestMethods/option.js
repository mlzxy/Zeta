var Zeta=require('../../'),
    should=require('chai').should(),
    request=require('supertest'),
    assert=request('assert');
var demo=Zeta.module('demo',[]);
demo.load();
describe('demo.options',function(){
    it('should handle the options request',function(done){
        demo.handler('h1',function($scope){
            $scope.res.writeHead(200,{
                'Content-Type':'text/plain',
                'Allow':'POST'
            });
            $scope.res.end();
        });
        demo.options('/foo','h1');
        request(demo.server()).
            options('/foo').
            expect(200).
            expect('Allow','POST',done);
    });
    it('should discard other requests',function(done){
        request(demo.server()).
            get('/foo').
            expect(404,done);
    });
    it('should decline the wrong path',function(done){
        request(demo.server()).
            options('/test').
            expect(404,done);
    });
    it('should support dynamic routes',function(done){
        demo.handler('h1',function($scope){
            $scope.res.writeHead(200,{
                'Content-Type':'text/plain',
                'Allow':'POST'
            });
            $scope.res.write($scope.req.params.foo);
            $scope.res.end();
        });
        demo.options('/users/:foo','h1');
        request(demo.server(true)).
            options('/users/test').
            expect(200).
            expect('Content-Type','text/plain').
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('test');
                done();
            });
    });
    it('should support more than one handler',function(done){
        demo.handler('h2',function($scope){
            $scope.res.writeHead(200,{
                'Content-Type':'text/plain',
                'Allow':'POST'
            });
            $scope.go('next');
        });
        demo.handler('h3',function($scope){
            $scope.res.end();
        });
        demo.options('/final',['h2','h3']);
        request(demo.server(true)).
            options('/final').
            expect(200).
            expect('Allow','POST',done);
    });
});
