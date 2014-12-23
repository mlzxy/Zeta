var Zeta=require('../../'),
    assert=require('assert'),
    request=require('supertest'),
    demo=Zeta.module('demo',[]),
    should=require('chai').should();
demo.load();

describe('registFactory',function(){
    it('can define factory as a function return object',function(done){
        demo.factory('$sayhi',function(){
            return {content:'hi,world'};
        });
        demo.handler('h1',function($scope,$sayhi){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($sayhi.content);
            $scope.res.end();
        });
        demo.get('/foo','h1');
        request(demo.server())
        .get('/foo')
        .expect(200)
        .end(function(err,res){
            if(err) done(err);
            res.text.should.equal('hi,world');
            done();
        });
    });
    it('can define factory as a function return function',function(done){
        demo.factory('$count',function(){
            return function(a,b){
                return a+b;
            };
        });
        demo.handler('h2',function($scope,$count){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($count(1,2).toString());
            $scope.res.end();
        });
        demo.get('/bar','h2');
        request(demo.server(true)).
            get('/bar').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('3');
                done();
            });
    });
    it('should share the same factory object in one request',function(done){
        demo.handler('h0',function($scope,$sayhi){
            $sayhi.content='wow';
            $scope.go('next');
        });
        demo.get('/jepa',['h0','h1']);
        request(demo.server(true)).
            get('/jepa').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('wow');
                done();
            });
    });
    it('should get a new one for every request',function(done){
        demo.handler('h3',function($scope,$sayhi){
            $sayhi.content='wow';
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($sayhi.content);
            $scope.res.end();
        });
        demo.get('/boot','h3');
        request(demo.server(true)).
            get('/boot').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('wow');
            });
        request(demo.server()).
            get('/foo').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('hi,world');
                done();
            });

    });
    it('should cover the previous one',function(done){
        demo.factory('$sayhi',function(){
            return {content:'hi,you'};
        });
        request(demo.server(true)).
            get('/foo').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('hi,you');
                done();
            });
    });
});

