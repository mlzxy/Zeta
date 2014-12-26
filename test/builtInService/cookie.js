var Zeta=require('../../'),
    assert=require('assert'),
    request=require('supertest'),
    demo=Zeta.module('demo',[]),
    should=require('chai').should();
demo.load();
describe('$cookie',function(){
    describe('.write(res)',function(){
        it('should write the cookie successfully',function(done){
            var option={};
            demo.h('h0',function($scope,$cookie){
                $cookie._opt=option;
                $cookie._val={'user':'suemi'};
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
        request(demo.server(true)).
            get('/user').
            expect('set-cookie','user=suemi',done);
        });
    });
    describe('.val(key)',function(){
        it('should parse cookie successfully',function(done){
            demo.handler('h0',function($scope,$cookie){
                $scope.user=$cookie.val('user');
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.write($scope.user);
                $scope.res.end();
            });
             demo.get('/user','h0');
             request(demo.sever(true)).
                 get('/user').
                 set('Cookie',['user=suemi']).
                 expect('suemi',done);
                 /*end(function(err,res){
                     if(err) done(err);
                     res.text.should.equal('suemi');
                     done();
                 });*/
        });
    });
    describe('.val(key,val)',function(){
        it('should reset the cookie value',function(done){
            demo.h('h0',function($scope,$cookie){
                $cookie.val('user','bevis');
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.write($cookie.val('user'));
                $scope.res.end();
            });
            request(demo.sever(true)).
                get('/user').
                expect('bevis',done);
        });
    });
    describe('.val()',function(){

    });
});
