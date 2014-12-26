var Zeta=require('../../'),
request=require('supertest'),
demo=Zeta.module('demo',[]),
should=require('chai').should(),
cookie=require('cookie');
demo.load();
describe('$cookie',function(){
    describe('.write(res)',function(){
        it('should write the cookie as json,string or object to res successfully',function(done){
            var option={
                'user':{
                    'maxAge':10000,
                    'path':'/'
                }
            };
            demo.h('h0',function($scope,$cookie){
                $cookie._opt=option;
                $cookie._val={
                    'user':'suemi',
                    'friend':JSON.stringify({name:'bevis'}),
                    'have':{
                        money:400
                    }
                };
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
            demo.get('/user','h0');
            request(demo.server(true)).
                get('/user').
                end(function(err,res){
                if(err) done(err);
                var val=["user=suemi; Max-Age=10000; Path=/",
                    'friend='+encodeURIComponent('{"name":"bevis"}'),
                    "have=%5Bobject%20Object%5D"];
                    res.headers['set-cookie'].should.eql(val);
                    done();
            });
        });
    });
    describe('.val(key)',function(){
        it('should parse cookie successfully',function(done){
            demo.handler('h0',function($scope,$cookie){
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.write($cookie.val('user'));
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                set('Cookie','user=suemi').
                expect(200).
                expect('suemi',done);
        });
        it('should handle cookie being json',function(done){
            demo.handler('h0',function($scope,$cookie){
                console.log($cookie._val);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.write(JSON.parse($cookie.val('user')).name);
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                set('Cookie','user='+JSON.stringify({name:'suemi'})).
                expect(200).
                expect('suemi',done);
        });
        it('should handle multiple cookies',function(done){
            demo.handler('h0',function($scope,$cookie){
                console.log($cookie._val);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                if($cookie.val('user')&&$cookie.val('money'))
                    $scope.res.write($cookie.val('user')+','+$cookie.val('money'));
                else $scope.res.write('undefined');
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                set('Cookie',['user=suemi;money=400']).
                expect(200).
                expect('suemi,400',done);
        });
        it('should get nothing when no such cookie set',function(done){
            request(demo.server()).
                get('/user').
                expect('undefined',done);
        });
    });
    describe('.val(key,val)',function(){
        it('should reset the cookie value',function(done){
            demo.h('h0',function($scope,$cookie){
                $cookie.val('user','bevis');
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                set('Cookie',['user=suemi']).
                expect('set-cookie','user=bevis',done);
        });
        it('should allow multiple calls and be able to set cookie as json or object',function(done){
            demo.h('h0',function($scope,$cookie){
                $cookie.val('user','bevis',{
                    'path':'/'
                });
                $cookie.val('friend',{
                    'name':'suemi'
                });
                $cookie.val('have',JSON.stringify({money:400}));
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                end(function(err,res){
                if(err) done(err);
                var val=['user=bevis; Path=/',
                    "friend=%5Bobject%20Object%5D",
                    'have='+encodeURIComponent('{"money":400}')];
                    res.headers['set-cookie'].should.eql(val);
                    done();
            });
        });
    });
    describe('.val(key,value,opt)',function(){
        it('should add options for cookie',function(done){
            demo.h('h0',function($scope,$cookie){
                $cookie.val('user','bevis',{
                    'maxAge':'10000',
                    'path':'/user'
                });
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                expect(200).
                expect('set-cookie','user=bevis; Max-Age=10000; Path=/user',done);
        });
    });
    describe('.val(key,vakue,opt,opt_val)',function(){
        it('should set option when there is no option',function(done){
            demo.h('h0',function($scope,$cookie){
                $cookie.val('user','bevis','maxAge',50000);
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                expect(200).
                expect('set-cookie','user=bevis; Max-Age=50000',done);
        });
        it('should set option value and cookie value',function(done){
            demo.h('h0',function($scope,$cookie){
                $cookie.val('user','bevis',{
                    'maxAge':'10000',
                    'path':'/user'
                });
                $cookie.val('user','bevis','maxAge',50000);
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                expect(200).
                expect('set-cookie','user=bevis; Max-Age=50000; Path=/user',done);
        });
    });
    describe('expire',function(){
        it('should set relative expires',function(done){
            demo.h('h0',function($scope,$cookie){
                $cookie.val('user','bevis','maxAge',1000);
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                expect(200).
                end(function(err,res){
                if(err) done(err);
                res.headers['set-cookie'][0].should.not.have.eql('Thu, 01 Jan 1970 00:00:01 GMT');
                done();
            });
        });
        it('should set maxAge',function(done){
            request(demo.server(true)).
                get('/user').
                expect(200).
                expect('set-cookie',/Max-Age=1/,done);
        });
        it('should not mutate option object',function(done){
            var options={maxAge:1000};
            var optionCopy={maxAge:1000};
            demo.h('h0',function($scope,$cookie){
                $cookie.val('user','bevis',options);
                $cookie.write($scope.res);
                $scope.res.writeHead(200,{'Content-Type':'text/plain'});
                $scope.res.end();
            });
            request(demo.server(true)).
                get('/user').
                expect(200).
                end(function(err,res){
                if(err) done(err);
                options.should.eql(optionCopy);
                done();
            });
        });
    });
});


