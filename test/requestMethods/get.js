var Zeta=require('../../'),
    should=require('chai').should(),
    request=require('supertest'),
    assert=request('assert');
var demo=Zeta.module('demo',[]);
demo.load();
describe('demo.get',function(){
    it('should handle the get request',function(done){
        demo.handler('h1',function($scope){
            console.log('hhh');
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write('GET');
            $scope.res.end();
        });
        demo.get('/foo','h1');
        request(demo.server()).
            get('/foo').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.include('GET');
                done();
            });
    });
    it('should discard other requests',function(done){
        request(demo.server()).
            post('/foo').
            expect(404,done);
    });
    it('should decline the wrong path',function(done){
        request(demo.server()).
            get('/test').
            expect(404,done);
    });
    it('should support dynamic routes',function(done){
        demo.handler('h1',function($scope){
            console.log($scope.req.params);
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($scope.req.params.foo);
            $scope.res.end();
        });
        demo.get('/users/:foo','h1');
        request(demo.server(true)).
            get('/users/test').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.include('test');
                done();
            });
    });
});
