var Zeta=require('../../../'),
    request=require('supertest'),
    demo=Zeta.module('demo',[]),
    should=require('chai').should();
demo.config('root',__dirname);
demo.config('public',__dirname+'/public');
demo.config.of('built-in').of('static-server').val('indexFile',['.html','.md']);
demo.load();
demo.any('static');
describe('service.built-in.static-server',function(){
    describe('return file according to path',function(){
        it('should return 404 when requst a non-exist file',function(done){
            var pathname='/bootstrap.css';
            request(demo.server()).
                get(pathname).
                expect(404).
                expect("This request URL " + pathname + " was not found on this server.",done);
        });
        it('should return an exist file',function(done){
            var pathname='/html/index.html';
            request(demo.server()).
                get(pathname).
                expect(200).
                expect('<html>\nit works\n\n</html>',done);
        });
        it('should support binary file',function(done){
            var pathname='/me.jpg';
            request(demo.server()).
                get(pathname).
                expect(200).
                expect('Content-Type','image/jpeg',done);
        });
        it('should be rewitten',function(done){
            demo.h('h0',function($scope){
                $scope.res.writeHead(200,{
                    'Content-Type':'text/plain'
                });
                $scope.res.write('welcome');
                $scope.res.end();
            });
            demo.get('/html/index.html','h0');
            request(demo.server(true)).
                get('/html/index.html').
                expect('welcome',done);
        });
    });
    describe('search file with name as index in request path',function(){
        it('should search index file for specific appendix in config',function(done){
            request(demo.server()).
                get('/html/').
                end(function(err,res){
                if(err) done(err);
                res.text.should.equal('<html>\nit works\n\n</html>');
                request(demo.server()).
                    get('/md').
                    expect('# it works\n',done);
            });
        });
        it('should allow you to end your path without /',function(done){
            request(demo.server()).
                get('/html').
                expect('<html>\nit works\n\n</html>',done);
        });
        it('should not support appendix not in the config',function(done){
            request(demo.server()).
                get('/htm/').
                expect(404,done);
        });
        it('should return 404 when request a non-exist path',function(done){
            request(demo.server()).
                get('/lib').
                expect(404).
                end(function(err,res){
                request(demo.server()).
                    get('/lib/').
                    expect(404,done);
            });
        });
        it('should return 404 when there is no index file in specific path',function(done){
            request(demo.server()).
                get('/none/').
                expect(404,done);
        });
        it('should just support one-level directory',function(done){
            request(demo.server()).
                get('/').
                expect(404,done);
        });
        it('should not search when the path is defined',function(done){
            demo.h('h1',function($scope){
                $scope.res.writeHead(404);
                $scope.res.end();
            });
            demo.get('/md','h1');
            request(demo.server(true)).
                get('/md').
                expect(404,done);
        });
    });
});

