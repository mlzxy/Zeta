var Zeta=require('../../'),
    should=require('chai').should(),
    request=require('supertest'),
    assert=request('assert');
var demo=Zeta.module('demo',[]);
demo.load();
describe('demo.get',function(){
    it('should handle the head request',function(done){
        demo.handler('h1',function($scope){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.end();
        });
        demo.head('/foo','h1');
        request(demo.server()).
            head('/foo').
            expect(200).
            expect('Content-Type','text/plain',done);
    });
    it('should discard other requests',function(done){
        request(demo.server()).
            get('/foo').
            expect(404,done);
    });
    it('should decline the wrong path',function(done){
        request(demo.server()).
            head('/test').
            expect(404,done);
    });
    it('should support dynamic routes',function(done){
        demo.handler('h1',function($scope){
            console.log($scope.req.params);
            $scope.res.writeHead(200,{'Content-Type':'text/html'});
            $scope.res.end();
        });
        demo.head('/users/:foo','h1');
        request(demo.server(true)).
            head('/users/test').
            expect(200).
            expect('Content-Type','text/html',done);
    });
    it('should support more than one handler',function(done){
        demo.handler('h2',function($scope){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.go('next');
        });
        demo.handler('h3',function($scope){
            $scope.res.write($scope.content);
            $scope.res.end();
        });
        demo.head('/final',['h2','h3']);
        request(demo.server(true)).
            head('/final').
            expect(200).
            expect('Content-Type','text/plain',done);
    });
});
