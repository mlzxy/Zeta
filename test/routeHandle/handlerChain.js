var Zeta=require('../../'),
    should=require('chai').should(),
    request=request('supertest'),
    assert=request('assert');
var Zeta=require('../../'),
    should=require('chai').should(),
    request=request('supertest'),
    assert=request('assert');

Zeta.module('demo.Provider',[]);
Zeta.module('demo.Factory',[]);
var demo=Zeta.module('demo',['demo.Provider','demo.Factory']);

describe('handlers',function(){
    describe('define handlers',function(){
        it('All handlers defined successfully',function(done){
            demo.handler();
        });
    });
    describe('straightCase',function(){
        it('',function(done){

        });
    });
    describe('jumpCase',function(){
        it('',function(done){

        });
    });
});
