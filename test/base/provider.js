var Zeta=require('../../'),
    assert=require('assert'),
    request=require('supertest'),
    demo=Zeta.module('demo',[]),
    should=require('chai').should();
demo.load();

describe('registProvider',function(){
    it('should define provider as an object',function(done){
        demo.provider('$sayhi',{
            content:'hi,world'
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
    it('should define provider as a function',function(done){
        demo.provider('$sayhello',function(){
            return 'hello,world';
        });
        demo.handler('h2',function($scope,$sayhello){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($sayhello());
            $scope.res.end();
        });
        demo.get('/bar','h2');
        request(demo.server(true)).
            get('/bar').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('hello,world');
                done();
            });
    });
    it('should get the provider itself',function(){
        var tmp=demo.provider('$sayhi');
        tmp.should.have.property('content');
        tmp.content.should.equal('hi,world');
    });
    it('should share the same provider between requests',function(done){
        demo.handler('h3',function($scope,$sayhi){
            $sayhi.content='wow';
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($sayhi.content);
            $scope.res.end();
        });
        demo.get('/qqq','h3');
        request(demo.server(true)).
            get('/qqq').
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
                res.text.should.equal('wow');
                done();
            });
    });
    it('should cover the previous one',function(){
        demo.provider('$sayhi',{
            content:'hi,you'
        });
        demo.provider('$sayhi').content.should.equal('hi,you');
    });
});

