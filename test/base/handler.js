var Zeta=require('../../'),
    assert=require('assert'),
    request=require('supertest'),
    demo=Zeta.module('demo',[]),
    should=require('chai').should();
demo.load();

describe('singleHandler',function(done){
    it('should get hello',function(){
        demo.handler('h1',function($scope){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write('hello,world');
            $scope.res.end();
        });
        demo.get('/test','h1');
        request(demo.server())
        .get('/test')
        .expect(200)
        .end(function(err,res){
            if(err) throw err;
            res.text.should.equal('hello,world');
        });
    });
    it('should cover the previous one',function(done){
        demo.handler('h1',function($scope){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write('hi,world');
            $scope.res.end();
        });
        request(demo.server(true)).
            get('/test').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('hi,world');
                done();
            });
    });
    it('should be called orderly by the time they were registered',function(done){
        demo.handler('h1',function($scope){
            $scope.count=1;
            go(next);
        });
        demo.handler('h2',function($scope){
            $scope.count=2;
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($scope.count.toString());
            $scope.res.end();
        });
        demo.get('/test','h2');
        request(demo.server(true)).
            get('/test').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('2');
                done();
            });
    });
});

