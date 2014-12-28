var Zeta=require('../../'),
    assert=require('assert'),
    request=require('supertest'),
    demo=Zeta.module('demo',[]),
    should=require('chai').should();
demo.config('serviceCache',true);
demo.load();
var app=Zeta.module('app',[]);
app.config('serviceCache',false);
app.load();

describe('demo.provider with service cache',function(){
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
                request(demo.server()).
                    get('/foo').
                    expect(200).
                    expect('wow',done);
            });
    });
    it('should cover the previous one',function(){
        demo.provider('$sayhi',{
            content:'hi,you'
        });
        demo.provider('$sayhi').content.should.equal('hi,you');
    });
    it('should be able to use another provider',function(done){
        demo.provider('$wel',function($sayhi){
            return $sayhi.content;
        });
        demo.handler('h0',function($scope,$wel,$sayhi){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($wel($sayhi));
            $scope.res.end();
        });
        demo.get('/home','h0');
        request(demo.server(true)).
            get('/home').
            expect(200).
            expect('hi,you',done);
    });
    it('should be able to use another factory',function(done){
        demo.factory('$count',function(){
            return function(a,b){return a+b;};
        });
        demo.provider('$wel',function($count){
            return $count(1,2);
        });
        demo.h('h0',function($scope,$wel,$count){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($wel($count).toString());
            $scope.res.end();
        });
        request(demo.server(true)).
            get('/home').
            expect(200).expect('3',done);
    });
});

describe('app.provider without service cache',function(){
    it('should define provider as an object',function(done){
        app.provider('$sayhi',{
            content:'hi,world'
        });
        app.handler('h1',function($scope,$sayhi){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($sayhi.content);
            $scope.res.end();
        });
        app.get('/foo','h1');
        request(app.server())
        .get('/foo')
        .expect(200)
        .end(function(err,res){
            if(err) done(err);
            res.text.should.equal('hi,world');
            done();
        });
    });
    it('should define provider as a function',function(done){
        app.provider('$sayhello',function(){
            return 'hello,world';
        });
        app.handler('h2',function($scope,$sayhello){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($sayhello());
            $scope.res.end();
        });
        app.get('/bar','h2');
        request(app.server(true)).
            get('/bar').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('hello,world');
                done();
            });
    });
    it('should get the provider itself',function(){
        var tmp=app.provider('$sayhi');
        tmp.should.have.property('content');
        tmp.content.should.equal('hi,world');
    });
    it('should share the same provider between requests',function(done){
        app.handler('h3',function($scope,$sayhi){
            $sayhi.content='wow';
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($sayhi.content);
            $scope.res.end();
        });
        app.get('/qqq','h3');
        request(app.server(true)).
            get('/qqq').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('wow');
                request(app.server()).
                    get('/foo').
                    expect(200).
                    expect('wow',done);
            });
    });
    it('should cover the previous one',function(){
        app.provider('$sayhi',{
            content:'hi,you'
        });
        app.provider('$sayhi').content.should.equal('hi,you');
    });
    it('should be able to use another provider',function(done){
        app.provider('$wel',function($sayhi){
            return $sayhi.content;
        });
        app.handler('h0',function($scope,$wel,$sayhi){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($wel($sayhi));
            $scope.res.end();
        });
        app.get('/home','h0');
        request(app.server(true)).
            get('/home').
            expect(200).
            expect('hi,you',done);
    });
    it('should be able to use another factory',function(done){
        app.factory('$count',function(){
            return function(a,b){return a+b;};
        });
        app.provider('$wel',function($count){
            return $count(1,2);
        });
        app.h('h0',function($scope,$wel,$count){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($wel($count).toString());
            $scope.res.end();
        });
        request(app.server(true)).
            get('/home').
            expect(200).expect('3',done);
    });
});

