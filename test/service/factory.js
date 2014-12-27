var Zeta=require('../../'),
    assert=require('assert'),
    request=require('supertest'),
    demo=Zeta.module('demo',[]),
    should=require('chai').should();
demo.config('serviceCache',true);
demo.load();
var app=Zeta.module('app',[]);
app.config('serviceCache',false);
app.l();

describe('demo.factory with service cache',function(){
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
    it('should get the factory itself',function(){
        var tmp1=demo.factory('$sayhi')();
        tmp1.should.have.property('content');
        tmp1.content.should.equal('hi,world');
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
            end(function(err,res){
            if(err) done(err);
            res.text.should.equal('wow');
            request(demo.server()).
                get('/foo').
                expect('hi,world',done);
        });
    });
    it('should cover the previous one',function(){
        demo.factory('$sayhi',function(){
            return {content:'hi,you'};
        });
        var tmp=demo.factory('$sayhi')();
        tmp.content.should.equal('hi,you');
    });
    it('should be able to use another provider',function(done){
        demo.provider('$wel',{
            a:1,
            b:2,
        });
        demo.factory('$done',function($wel){
            return function(){
                return $wel.a+$wel.b;
            };
        });
        demo.h('h4',function($scope,$done){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($done().toString());
            $scope.res.end();
        });
        demo.get('/use','h4');
        request(demo.server(true)).
            get('/use').
            expect('3',done);
    });
    it('should be able to use another factory',function(done){
        demo.factory('$done',function($count){
            return function(){
                return $count(1,2);
            };
        });
        request(demo.server(true)).
            get('/use').
            expect('3',done);
    });
    it('should have $scope as its first arg when define a factory',function(done){
        demo.factory('$arg',function($wel,$scope){
            return function(){
                return $scope.content;
            };
        });
        demo.h('h0',function($scope,$arg){
            $scope.content='wel';
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($arg());
            $scope.res.end();
        });
        demo.get('/','h0');
        try{
            request(demo.server(true)).
                get('/').
                expect('wel');
        }
        catch(err){
            err.message.should.include('argument');
            done();
        }
    });
});

describe('app.factory without service cache',function(){
    it('can define factory as a function return object',function(done){
        app.factory('$sayhi',function(){
            return {content:'hi,world'};
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
    it('can define factory as a function return function',function(done){
        app.factory('$count',function(){
            return function(a,b){
                return a+b;
            };
        });
        app.handler('h2',function($scope,$count){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($count(1,2).toString());
            $scope.res.end();
        });
        app.get('/bar','h2');
        request(app.server(true)).
            get('/bar').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('3');
                done();
            });
    });
    it('should get the factory itself',function(){
        var tmp1=app.factory('$sayhi')();
        tmp1.should.have.property('content');
        tmp1.content.should.equal('hi,world');
    });
    it('should not share the same factory object in one request',function(done){
        app.handler('h0',function($scope,$sayhi){
            $sayhi.content='wow';
            $scope.go('next');
        });
        app.get('/jepa',['h0','h1']);
        request(app.server(true)).
            get('/jepa').
            expect(200).
            end(function(err,res){
                if(err) done(err);
                res.text.should.equal('hi,world');
                done();
            });
    });
    it('should get a new one for every request',function(done){
        app.handler('h3',function($scope,$sayhi){
           $sayhi.content='wow';
           $scope.res.writeHead(200,{'Content-Type':'text/plain'});
           $scope.res.write($sayhi.content);
           $scope.res.end();
        });
        app.get('/boot','h3');
        request(app.server(true)).
            get('/boot').
            end(function(err,res){
            if(err) done(err);
            res.text.should.equal('wow');
            request(app.server()).
                get('/foo').
                expect('hi,world',done);
        });
    });
    it('should cover the previous one',function(){
        app.factory('$sayhi',function(){
            return {content:'hi,you'};
        });
        var tmp=app.factory('$sayhi')();
        tmp.content.should.equal('hi,you');
    });
    it('should be able to use another provider',function(done){
        app.provider('$wel',{
            a:1,
            b:2,
        });
        app.factory('$done',function($wel){
            return function(){
                return $wel.a+$wel.b;
            };
        });
        app.h('h4',function($scope,$done){
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($done().toString());
            $scope.res.end();
        });
        app.get('/use','h4');
        request(app.server(true)).
            get('/use').
            expect('3',done);
    });
    it('should be able to use another factory',function(done){
        app.factory('$done',function($count){
            return function(){
                return $count(1,2);
            };
        });
        request(app.server(true)).
            get('/use').
            expect('3',done);
    });
    it('should have $scope as its first arg when define a factory',function(done){
        app.factory('$arg',function($wel,$scope){
            return function(){
                return $scope.content;
            };
        });
        app.h('h0',function($scope,$arg){
            $scope.content='wel';
            $scope.res.writeHead(200,{'Content-Type':'text/plain'});
            $scope.res.write($arg());
            $scope.res.end();
        });
        app.get('/','h0');
        try{
            request(app.server(true)).
                get('/').
                expect('wel');
        }
        catch(err){
            err.message.should.include('argument');
            done();
        }
    });
});

